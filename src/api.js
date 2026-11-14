const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5077/api';
let accessToken = sessionStorage.getItem('baran_admin_token');

async function request(path, options = {}) {
  const headers = { ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...options.headers };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!response.ok) {
    const problem = await response.json().catch(() => ({}));
    throw new Error(problem.message || problem.detail || 'ارتباط با سرور با خطا روبه‌رو شد.');
  }
  return response.status === 204 ? null : response.json();
}

const json = body => JSON.stringify(body);
const toService = x => ({ id:x.id, title:x.title, desc:x.description, price:Number(x.startingPrice).toLocaleString('fa-IR'), rawPrice:x.startingPrice, duration:x.durationMinutes, icon:x.icon, active:x.isActive });
const toStaff = x => ({ id:x.id, name:x.name, role:x.role, years:x.experience, img:x.imageUrl, active:x.isActive });
const toCertificate = x => ({ id:x.id, title:x.title, issuer:x.issuer, year:x.year, code:x.code, description:x.description, skills:x.skills, image:x.mediaUrl, type:x.mediaType });
const toMedia = x => ({ id:x.id, name:x.name, src:x.url.startsWith('http') ? x.url : `${API_URL.replace(/\/api$/, '')}${x.url}`, type:x.type, section:x.section });

export const api = {
  async login(username, password) {
    const result = await request('/auth/login', { method:'POST', body:json({ username, password }) });
    accessToken = result.accessToken;
    sessionStorage.setItem('baran_admin_token', accessToken);
    return result;
  },
  logout() { accessToken = null; sessionStorage.removeItem('baran_admin_token'); },
  async loadSite() {
    const [services, staff, certificates, media, salon, blocked] = await Promise.all([
      request('/services'), request('/content/staff'), request('/content/certificates'), request('/content/media'), request('/content/salon'), request('/appointments/blocked-dates')
    ]);
    return { services:services.map(toService), staff:staff.map(toStaff), certificates:certificates.map(toCertificate), media:media.map(toMedia), salon, blocked, blockedDates:blocked.map(x=>x.date) };
  },
  createAppointment: body => request('/appointments', { method:'POST', body:json(body) }),
  getAppointments: () => request('/appointments'),
  getSmsSettings: () => request('/settings/sms'),
  saveSmsSettings: settings => request('/settings/sms',{method:'PUT',body:json(settings)}),
  testSms: receptor => request('/settings/sms/test',{method:'POST',body:json({receptor})}),
  async addService(s) { return toService(await request('/services',{method:'POST',body:json({title:s.title,description:s.desc,startingPrice:Number(String(s.price).replace(/[^0-9]/g,'')),durationMinutes:s.duration,icon:s.icon,isActive:true})})); },
  deleteService: id => request(`/services/${id}`, { method:'DELETE' }),
  setService: (id,s) => request(`/services/${id}`,{method:'PUT',body:json({title:s.title,description:s.desc,startingPrice:s.rawPrice||Number(String(s.price).replace(/[^0-9]/g,'')),durationMinutes:s.duration,icon:s.icon,isActive:s.active})}),
  blockDate: (date,reason='') => request('/appointments/blocked-dates',{method:'POST',body:json({date,reason})}),
  unblockDate: id => request(`/appointments/blocked-dates/${id}`,{method:'DELETE'}),
  async addStaff(s) { return toStaff(await request('/content/staff',{method:'POST',body:json({name:s.name,role:s.role,experience:s.years,imageUrl:s.img,isActive:true})})); },
  deleteStaff: id => request(`/content/staff/${id}`,{method:'DELETE'}),
  async upload(file,section='gallery') { const form=new FormData();form.append('file',file);form.append('section',section);return toMedia(await request('/content/media',{method:'POST',body:form})); },
  deleteMedia: id => request(`/content/media/${id}`,{method:'DELETE'}),
  async addCertificate(c) { return toCertificate(await request('/content/certificates',{method:'POST',body:json({title:c.title,issuer:c.issuer,year:c.year,code:c.code,description:c.description,skills:c.skills,mediaUrl:c.image,mediaType:c.type})})); },
  deleteCertificate: id => request(`/content/certificates/${id}`,{method:'DELETE'}),
  saveSalon: salon => request('/content/salon',{method:'PUT',body:json(salon)})
};

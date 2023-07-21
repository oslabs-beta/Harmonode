const {ipcRenderer} = window.require('electron');

// export function setTestData(data) {
//   ipcRenderer.invoke('storeStuff', data);
// }

// export async function getTestData() {
//   return await ipcRenderer.invoke('getStoredStuff');
// }

export async function setProjects(projects) {
  ipcRenderer.invoke('storeProjects', projects);
}

export async function getProjects() {
  const projects = await ipcRenderer.invoke('getProjects');
  return Array.isArray(projects) ? projects : [];
}

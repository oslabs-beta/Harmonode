const {ipcRenderer} = window.require('electron');

// export function setTestData(data) {
//   ipcRenderer.invoke('storeStuff', data);
// }

// export async function getTestData() {
//   return await ipcRenderer.invoke('getStoredStuff');
// }

export async function setProjects(project) {
  const projects = await ipcRenderer.invoke('getProjects');
  //
  if (!Array.isArray(projects)) {
    ipcRenderer.invoke('storeProjects', [project]);
    return 'success';
  }

  for (let proj of projects) {
    if (proj.name === project.name) {
      return 'duplicate';
    }
  }
  const newProjects = [...projects, project];
  ipcRenderer.invoke('storeProjects', projects);
  return 'success';
}

export async function getProjects() {
  const projects = await ipcRenderer.invoke('getProjects');
  return Array.isArray(projects) ? projects : [];
}

const {ipcRenderer} = window.require('electron');

export async function storeProjects(projects) {
  ipcRenderer.invoke('storeProjects', projects);
}

export async function getProjects() {
  const projects = await ipcRenderer.invoke('getProjects');
  return Array.isArray(projects) ? projects : [];
}

export async function loadProject(project) {
  const updatedProject = await ipcRenderer.invoke('loadProject', project);
  return updatedProject;
}

export async function stringCode(filePath) {
  const stringCode = await ipcRenderer.invoke('stringCode', filePath);
  return stringCode;
}

export async function saveStringCode(filePath, code) {
  await ipcRenderer.invoke('saveCode', filePath, code);
}

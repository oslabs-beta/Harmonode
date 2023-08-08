# Harmonode



<div style="display: flex; align-items: center; justify-content: center; flex-direction:row">
  <img src="https://github.com/oslabs-beta/Harmonode/assets/68034977/9725a0dc-47e6-4397-9efa-f424def1f24a" alt="Logo" width="350">
  <div style="margin-left: 20px;">As modern web applications continue to evolve, so does the complexity of managing and visualizing endpoints, fetch requests, and data flow between the client-side, routes, and backend components. As your application scales, keeping track of these connections can quickly turn into a nightmare.
Enter Harmonode — an Electron-powered development tool that lightens the challenges of endpoint management and visualization. By harnessing the power of ReactFlow, Harmonode empowers users to seamlessly navigate through the web of connections, offering a clear and concise visualization of the trail each route follows through the component tree of an app, from it's initial request(s) in any frontend components, through the server, any middleware, and back again.
</div>
</div>




---

## Table of Contents

- [Usage](#usage)
- [Getting started](#gettingstarted)
- [Contributors](#contributors)


<a name="usage"></a>
## Usage
<div style="margin-left: 20px;">
From the home screen, navigate to "Projects", and click "Add New Project". Follow the prompts to load your project code base, and be sure to designate the name of your backend server file. Fetch requests that are made directly within React components will be readable by Harmonode, which will then render a visual using React Flow of the paths of these requests through the file structure. 
</div>


---




![harmonodeMainScreen](https://github.com/oslabs-beta/Harmonode/assets/68034977/2493946b-c7f6-4f5f-a7c9-03d575f8f0be)

---


![output1](https://github.com/oslabs-beta/Harmonode/assets/68034977/8a070763-f7b4-475f-908e-999afe2b2361)

---

<a name="gettingstarted"></a>

## Getting Started


After cloning, run ```npm install```, and make sure that typescript is installed globally. ```npm run dev``` will start the electron app on your local system. Click on "Projects" in the sidebar, then "Add New Project", and load any standard project built with a React frontend and a Node.js backend, preferably with Express. Click on Diagram to view a React Flow visual of fetch paths, or List to view a more detailed view. Various viewing options are available in Settings.

<a name="contributors"></a>

## Contributors

The founding fathers of Harmonode:

- Hamza Chowdry | [@hmz44](https://github.com/hmz44)
- Eric Dalio | [@EricDalio](https://github.com/EricDalio)
- Ken Johnston | [@kfiddle](https://github.com/kfiddle) 
- Sebastian Sarmiento | [@sebastiansarm](https://github.com/sebastiansarm/)
- Tim Weidinger | [@timweidinger](https://github.com/timweidinger) 



<!-- Rest of the content -->

import React from 'react';

function Home() {
  const titleText: React.CSSProperties = {
    fontStyle: 'bold',
    fontSize: 75,
    color: '#4caf50',
    marginTop: 15,
    marginBottom: 3,
    textAlign: 'center',
  };
  const italicText: React.CSSProperties = {
    fontStyle: 'italic',
    fontSize: 25,
    margin: 0,
    textAlign: 'center',
    color: '#868484',
  };
  const subTitleText: React.CSSProperties = {
    fontSize: 25,
    margin: 0,
    textAlign: 'center',
    marginTop: 10,
  };
  const headingText: React.CSSProperties = {
    fontStyle: 'bold',
    fontSize: 25,
    margin: 0,
    paddingLeft: 20,
    color: '#4caf50',
  };
  const pText: React.CSSProperties = {
    fontSize: 18,
    margin: 2,
    paddingLeft: 20,
  };

  return (
    <div>
      {/* <img>'./server/icon.png'</img> */}
      <h1 style={titleText}>Harmonode</h1>
      <p style={italicText}> "Harmonize your code with Harmonode!</p>
      <p style={subTitleText}>
        A tool to visualize the flow between front end fetch requests and
        backend routes.
        <h1></h1>
      </p>
      <p style={headingText}>Currently:</p>
      <ul>
        <li style={pText}>Load any project from your file system</li>
        <ul>
          <li style={pText}>
            Ignore directories you don’t want to visualize (like test folders,
            bundled folders, etc.)
          </li>
          <li style={pText}>
            Choose what extensions you want to approve for visualizing (you can
            ignore jsx files for example)
          </li>
        </ul>
        <li style={pText}>
          Tracks live-updates to any changes made to your project in real time
        </li>
        <ul>
          <li style={pText}>
            When the user hits save on their working project, those changes are
            immediately reflected in Harmonode.
          </li>
        </ul>
        <li style={pText}>Can set the theme of your project</li>
        <li style={pText}>Displays a list of all of the fetch requests</li>
        <li style={pText}>
          Displays a ReactFlow diagram that shows the connections between files
          that have fetch calls and the endpoints that they are fetching
        </li>
      </ul>
      <p style={headingText}>Next:</p>
      <ul>
        <li style={pText}>
          Show the data structure that the frontend is sending to the backend
        </li>
        <li style={pText}>
          Show the data structure that the backend is sending to the frontend
        </li>
        <li style={pText}>
          Show the middleware (controllers) and potentially what they are doing
          with the data
        </li>
        <li style={pText}>
          Handle more complicated fetch requests (like template literals, urls
          by variable)
        </li>
        <li style={pText}>Write unit tests</li>
      </ul>
      <p style={headingText}>Stretch:</p>
      <ul>
        <li style={pText}>Include other fetch utilities like axios.</li>
        <li style={pText}>
          Set up a local SQLite DB to store all of the data and store data in
          tables
        </li>
        <ul>
          <li>
            Will be able to streamline responses a bit easier with table joins
          </li>
        </ul>
        <li style={pText}>Finish typescripting everything</li>
      </ul>
    </div>
  );
}

export default Home;

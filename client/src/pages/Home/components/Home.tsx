import React from 'react';
import icon from '../../../../../server/icon.png';
import fullnameIcon from '../../../../../server/harmonode_logo_fullname.png';


function Home() {
  const ImageCenter: React.CSSProperties = {
    textAlign: 'center',
  };
  const image: React.CSSProperties = {
    width: '450px',
    marginTop: 25,
    marginBottom: 0,
    marginRight: '8rem'
  };
  const titleText: React.CSSProperties = {
    fontStyle: 'bold',
    fontSize: 75,
    color: '#42A186',
    marginTop: 0,
    marginBottom: 3,
    textAlign: 'center',
  };
  const italicText: React.CSSProperties = {
    fontStyle: 'italic',
    fontSize: 35,
    margin: 0,
    textAlign: 'center',
    // color: '#868484',
  };
  const subTitleText: React.CSSProperties = {
    fontSize: 25,
    margin: 0,
    textAlign: 'center',
    marginTop: 10,
    color: '#42A186',
  };
  const headingText: React.CSSProperties = {
    fontStyle: 'bold',
    fontSize: 25,
    margin: 0,
    paddingLeft: 20,
    color: '#42A186',
  };
  const pText: React.CSSProperties = {
    fontSize: 18,
    margin: "1rem",
    paddingLeft: 20,
  };
  const bannerContainer: React.CSSProperties = {
    display: 'flex',
    marginBottom: '5rem',
    // justifyContent: 'space-around'
  };

  const bannerTextContainer: React.CSSProperties = {
    display: "flex", 
    // alignItems: "flex-start", 
    flexDirection: "column", 
    justifyContent: "center",
    paddingTop: "2.5rem"
  };

  const contentContainer: React.CSSProperties = {
    marginLeft: "2.7rem", 
  };



  return (
    <div>
      <div style={bannerContainer}>
        <img style={image} src={fullnameIcon} alt='Image' />
        <div style={bannerTextContainer} >
        <p style={italicText}> "Harmonize your code with Harmonode!"</p>
       <p style={subTitleText}>
        A tool to visualize the flow between front end fetch requests <br /> and
        backend routes.
      </p>
        </div>
      </div>  
      <div style={contentContainer}>
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
      <p style={headingText}>Next in Development:</p>
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
        <li style={pText}>Include other fetch utilities like axios.</li>
      </ul>
    </div>
    </div>
  );
}

export default Home;

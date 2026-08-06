function Loader({ text = "Loading FitZone..." }) {

  return (

    <div className="loader-container">

      <div className="loader-logo">
        F
      </div>

      <div className="loader-spinner"></div>

      <p>{text}</p>

    </div>

  );

}

export default Loader;
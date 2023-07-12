const Finder = ({finder,handleFinderChanges}) => {
    return (
      <p>
        find countries <input 
          value={finder}
          onChange={handleFinderChanges}
        />
      </p>
    )
  }

export default Finder
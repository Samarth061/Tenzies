export default function Die(props) {

  const styles = {
    backgroundColor: props.holdIt ? "#59E391" : "white"
  }

  return (
    <button 
      style={styles} 
      onClick={() => props.hold(props.id)}>
        {props.value}
    </button>
  )
}


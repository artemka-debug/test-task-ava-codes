import 'components/App/index.css'
import {useStarWarsPeople} from "../../hooks/useStarWarsPeople";
import {RequestStatus}     from "../../sdk/hooks/useStarWarsSdk";

const App = () => {
  const { result, error, status } = useStarWarsPeople();

  if (status === RequestStatus.Loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2 color="red">{error}</h2>
  }

  return <main className="main">
    {result?.map(({ name }) => (
      <div className="person-card" key={name}>
        {name}
      </div>
    ))}
  </main>
}

export default App;

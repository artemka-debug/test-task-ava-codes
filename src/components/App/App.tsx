import 'components/App/index.css'
import {useStarWarsPeople} from "hooks/useStarWarsPeople";
import {RequestStatus}     from "sdk/hooks/useStarWarsSdk";
import {useState}          from "react";
import {StarWarsPerson}        from "sdk/hooks/starWarsPeople/useStarWarsPeopleSdk";
import StarWarsPersonInfoModal from "components/StarWarsPersonInfoModal/StarWarsPersonInfoModal";

const App = () => {
  const {
          result,
          error,
          status
        }                                   = useStarWarsPeople();
  const [selectedPerson, setSelectedPerson] = useState<StarWarsPerson | null>(null);

  return <main className="main">
    {
      status === RequestStatus.Loading ?
        <h1>Loading Star Wars People List...</h1> :
        error ? <h1 color="red">{error}</h1> :
          <>
            <h1>Star Wars People List</h1>
            {result?.map((person) => (
              <div className="person-card"
                   key={person.name}
                   onClick={() => setSelectedPerson(person)}
              >
                {person.name}
              </div>
            ))}
            {selectedPerson && <StarWarsPersonInfoModal
              isOpen={true}
              label={selectedPerson.name}
              onClose={() => setSelectedPerson(null)}
              person={selectedPerson}
            />}
          </>
    }
  </main>
}

export default App;

interface CharacterInfo {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
  location: {
    name: string;
  };
  gender: string;
  origin: {
    name: string;
  };
}

export default CharacterInfo;

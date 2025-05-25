const useSearchUsers = ()=>{
  const [query, setQuery] =useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(()=>{

    const fetchUsers = async ()=>{
      setLoading(true);
      try{
        const response = await fetch(`${SERVER_HOST}/users/search/${query}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonRes = await response.json();
        setUsers(jsonRes.data);
      }catch(err){
        console.log(err);
      }finally{
        setLoading(false);
      }
    }

    if(!query.trim().length===0){

      fetchUsers();
    } 

  }, [query])


  return [setQuery, users, loading]
}
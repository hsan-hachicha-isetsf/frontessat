import { useState,useEffect } from 'react';

function Dashboard() {
    const [name, setname] = useState('');
    const [avatar, setavatar]=useState('');

    useEffect(() => {

  let user = localStorage.getItem("user");

  setname(JSON.parse(user).name);
  setavatar(JSON.parse(user).avatar);

    }, []);

    return ( 
    <>
    <div>
      Admin :  {name}
      <img src={avatar} alt="" width={100} height={100}/>
    </div>
    <h1>Dashboard</h1>
    <div>
        Dashboard main
    </div>
    </> 
);
}

export default Dashboard;

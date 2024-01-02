
import { useEffect, useState, useMemo } from 'react';

import './App.css';

import { array } from './list';
import searcDelete from './img/icon-remove.svg';

function Job({ avatar, name, status, featured, title, time, workType, localType, tag, ontagClick }) {


  return (
    <div className="jobList">
      <img className="logo" src={avatar} alt="company logo" />
      <div className="sectionTitle">
        <div className="info">
          <div className="name">{name}</div>
          <div className={status ? 'status' : ''}> {status ? 'NEW!' : ''}</div>
          <div className={featured ? 'featured' : ''}> {featured ? 'FEATURED' : ''}</div>
        </div>

        <div className="title" >{title}</div>

        <div className="bottominfo">
          <div className="time">{time}</div>
          <div className="worktime">{workType}</div>
          <div className="local">{localType}</div>
        </div>
      </div>
      <div className="skill">
        {tag.map((i) => {
          return (
            <div className="tag" onClick={() => ontagClick(i)} key={i}>
              {i}
            </div>
          );
        }

        )}
      </div>
    </div>
  );

};


function App() {
  const [search, setSearch] = useState([]);
  const [list, setList] = useState(array);
  const [list2, setList2] = useState([]);
  
  //this function create one array and this array have all search tag
  function searchTag(i) {
    let a = false;
    if (search.length === 0) {
   
      setSearch([...search, i]);

    } else {
     
      search.map((tag) => {
        if (tag === i) { a = true;}
      });
      if (!a) { setSearch([...search, i]); } else { a = false; }
    }
  }

  useEffect(() => {
    let put = true;
    let result = [];

    list.map((element) => {
      search.map((s) => {
        if (element.tag.includes(s)) {
          if (put) {
            put = true;
          }
        } else {
          put = false;

        }
      })
      if (put) {
        result = [...result, element];
      } else {
        put = true;
      }
    })
    setList2(result);

  }, [search]);


  const deleteByValue = value => {
    setSearch(oldValues => {
      return oldValues.filter(item => item !== value)
    })}

    

  let visible = search.length > 0 ? "visible" : "hiding";
  let listChanger = list2.length > 0 ? list2 : list;

  return (
    <div className="App">
      <div className="header">
        <div className={visible}>
          {
        
              search.map((y)=>{
                
                return(
                  <div className="items" key={y}>
                    {y}
                    <button onClick={() => {deleteByValue(y)}} className='deletebutton'><img src={searcDelete}/></button>
                  </div>
                )
                
              })                              
          }
        </div>
      </div>
      <div className="main" >

        {listChanger.map((row) => {

          return (
            <Job
              key={row.id}
              avatar={row.avatar}
              name={row.name}
              status={row.status}
              featured={row.featured}
              title={row.title}
              time={row.time}
              workType={row.workType}
              localType={row.localType}
              tag={row.tag}
              ontagClick={searchTag}
            />)
        })}

      </div>
    </div>
  );
}

export default App;



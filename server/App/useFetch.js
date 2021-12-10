import React from 'react';

/**
 * [Component] useFetch
 
 * @description use to fetch api data

 * @param {*} setStatus set the status depending on the API fetch
 * @param {Array} setData accepts the data fetched from api inside an array
 * @param {*} setError toogles boolean value on error
 
 * @returns the api result
 */

const UseFetch = link => {
  const [status, setstatus] = React.useState('idle');
  const [Data, setData] = React.useState([]);
  const [error, setError] = React.useState(false);
  // console.log(link);

  const pech = React.useCallback(async () => {
    try {
      setstatus('Loading');
      const beforefetch = await fetch(link.api, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Key X9kOSIuKSxSKGwZF3VT9H606cpnhzt4XTFdnoluE',
        },
        body: JSON.stringify({
          parameters: {
            ingredient: link.itemName,
            cuisine: 'INDIAN',
          },
          max_age: 0,
        }), // body data type must match "Content-Type" header
      });
      const Jsondata = await beforefetch.json();
      // console.log(Jsondata);
      // console.log(Jsondata.job.id);
      // console.log('/api/jobs/' + Jsondata.job.id);

      const beforefetch2 = await fetch('/api/jobs/' + Jsondata.job.id, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Key X9kOSIuKSxSKGwZF3VT9H606cpnhzt4XTFdnoluE',
        },
      });
      if (beforefetch.status === 400) {
        pech();
      }

      const Jsondata2 = await beforefetch2.json();
      // while(Jsondata2.job.status === 3 ){
      //     console.log(Jsondata2.job.status)
      //     beforefetch2 = await fetch('/api/jobs/'+ Jsondata.job.id, {
      //         method: 'GET', // *GET, POST, PUT, DELETE, etc.
      //         mode: 'cors', // no-cors, *cors, same-origin
      //         credentials: 'include',
      //         headers: {
      //           'Content-Type': 'application/json',
      //           'Authorization': 'Key X9kOSIuKSxSKGwZF3VT9H606cpnhzt4XTFdnoluE'
      //         }
      //     })
      //     console.log('test')
      //     Jsondata2 = await beforefetch2.json();
      //     console.log(Jsondata2)
      // }

      // console.log(Jsondata2);

      const beforefetch3 = await fetch(
        '/api/queries/384/results/' + Jsondata2.job.query_result_id + '.json',
        {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Key X9kOSIuKSxSKGwZF3VT9H606cpnhzt4XTFdnoluE',
          },
        }
      );
      if (beforefetch3.status === 500) {
        console.log('500 Responce');
        pech();
      }

      const Jsondata3 = await beforefetch3.json();
      setData(Jsondata3.query_result.data);

      setstatus('success');
    } catch (Error) {
      setError(true);
      setstatus('error');
    }
  }, []);

  React.useEffect(() => {
    pech();
  }, [pech]);

  return [status, Data, error];
};

export default UseFetch;

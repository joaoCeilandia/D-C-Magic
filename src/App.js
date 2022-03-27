import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import './App.css';
const mtg = require('mtgsdk')


function App() {
  const [searchText, setSearchText] = useState('thassa');
  const [list, setList] = useState([]);
  const [listByName, setListByName] = useState([]);
  const [listByCmc, setListByCmc] = useState([]);

  function merge(field, arr, l, m, r)
{
    var n1 = m - l + 1;
    var n2 = r - m;
  
    // Create temp arrays
    var L = new Array(n1); 
    var R = new Array(n2);
  
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
  
    // Merge the temp arrays back into arr[l..r]
  
    // Initial index of first subarray
    var i = 0;
  
    // Initial index of second subarray
    var j = 0;
  
    // Initial index of merged subarray
    var k = l;
  
    while (i < n1 && j < n2) {
      console.log(L[i][field], R[j][field])
        if (L[i][field] <= R[j][field]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
  
    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
  
    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}
  
// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
function mergeSort(field,arr,l, r){
    if(l>=r){
        return;//returns recursively
    }
    var m =l+ parseInt((r-l)/2);
    mergeSort(field,arr,l,m);
    mergeSort(field,arr,m+1,r);
    merge(field,arr,l,m,r);
}

  useEffect(() => {
    if(!list.length) return;
    let arr = [...list];
    mergeSort('name', arr, 0, list.length-1)
    setListByName(arr);
    arr = [...list];
    mergeSort('cmc', arr, 0, list.length-1)
    setListByCmc(arr);
  }, [list]);

  useEffect(() => {
    let newList = [];
    mtg.card.all({name: searchText}).on('data', card => {
      //setTestList(prev => [...prev,teste])
      newList.push(card);
    })
    setTimeout(() => {
      setList(newList);
    }, 1000)
  }, [searchText]);

  return (
    <div>
      <div> escreva um nome : <Input value={searchText} onChange={e => setSearchText(e.target.value)}/></div>
      <div style={{display: 'flex'}}>
        ordem por nome:
        {listByName.map(card => <div>{card.name} {card.cmc} <img src={card.imageUrl}/></div>)}
      </div>
      <div style={{display: 'flex'}}>
        ordem por cmc:
        {listByCmc.map(card => <div>{card.name} {card.cmc} <img src={card.imageUrl}/></div>)}
      </div>
    </div>
  );
}

export default App;

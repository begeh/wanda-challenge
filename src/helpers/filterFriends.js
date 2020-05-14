const filterFriends = (friends, list) => {
  const arr = [];
  for(let friendId of friends){
    if(list[friendId - 1]){
      arr.push(list[friendId - 1]);
    }
  }
  console.log(arr);
  return arr;
}

export default filterFriends;
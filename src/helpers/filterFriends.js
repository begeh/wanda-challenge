const filterFriends = (friends, list) => {
  const arr = [];
  for(let friendId of friends){
    if(list[friendId - 1]){
      arr.push(list[friendId - 1]);
    }
  }
  return arr;
}

export default filterFriends;
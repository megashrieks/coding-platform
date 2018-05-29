

// input: 
// start_time, end_time:
// [year, month(0-11), date(0-31), hour(0-24), min(0-60)]
// let s_time = [2018, 4, 29, 21, 10], e_time = [2018, 4, 29, 21, 20];


// output: [days, hr, min, sec]

const get_remaining_time = (s_time, e_time) => {

  let { floor } = Math;
  let now = new Date();
  let start_time = new Date(...s_time);
  let end_time = new Date(...e_time);

  if(now < start_time)   // hasnt started yet.
    return [-1, -1, -1, -1];
  else if(now > end_time)  // finished.  
    return [0, 0, 0, 0];

  let temp = floor(new Date(end_time-now).getTime() / 1000);
  let arr = [];
  arr.push(floor(temp / 86400));
  temp %= 86400;
  arr.push(floor(temp / 3600));
  temp %= 3600;
  arr.push(floor(temp / 60));
  temp %= 60;
  arr.push(temp);     
  return arr
}

module.exports = { get_remaining_time };


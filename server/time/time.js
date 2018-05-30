

// input: 
// start_time, end_time:
// [year, month(0-11), date(1-31), hour(0-23), min(0-59)]

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

  let time_in_seconds = floor(new Date(end_time-now).getTime() / 1000);
  let arr = [];
  arr.push(floor(time_in_seconds / 86400));
  time_in_seconds %= 86400;
  arr.push(floor(time_in_seconds / 3600));
  time_in_seconds %= 3600;
  arr.push(floor(time_in_seconds / 60));
  time_in_seconds %= 60;
  arr.push(time_in_seconds);
  return arr
}

module.exports = { get_remaining_time };


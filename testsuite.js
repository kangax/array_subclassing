test('length = 4294967296 (S15.4.5.1_A1.1_T1)', function() {
  var error;
  try {
    var x = new SubArray();
    x.length = 4294967296;
  } catch(e) {    
    error = e;
  }
  ok(error instanceof RangeError);
});

test('length = -1 (S15.4.5.1_A1.1_T1)', function() {
  var error;
  try {
    var x = new SubArray();
    x.length = -1;
  } catch(e) {    
    error = e;
  }
  ok(error instanceof RangeError, 'length = -1');
});

test('error = 1.5 (S15.4.5.1_A1.1_T1)', function() {
  var error;
  try {
    var x = new SubArray();
    x.length = 1.5;
  } catch(e) {    
    error = e;
  }
  ok(error instanceof RangeError, 'length = 1.5');
});

test('length = NaN (S15.4.5.1_A1.1_T2)', function() {
  var error;
  try {
    var x = new SubArray();
    x.length = NaN;
  } catch(e) {    
    error = e;
  }
  ok(error instanceof RangeError, 'length = NaN')
});

test('length = Number.POSITIVE_INFINITY (S15.4.5.1_A1.1_T2)', function() {
  try {
    var x = new SubArray();
    x.length = Number.POSITIVE_INFINITY;
  } catch(e) {    
    error = e;
  }
  ok(error instanceof RangeError);
});

test('length = Number.NEGATIVE_INFINITY (S15.4.5.1_A1.1_T2)', function() {
  try {
    var x = new SubArray();
    x.length = Number.NEGATIVE_INFINITY;
  } catch(e) {    
    error = e;
  }
  ok(error instanceof RangeError);
});

test('length = undefined (S15.4.5.1_A1.1_T2)', function() {
  try {
    var x = new SubArray();
    x.length = undefined;
  } catch(e) {    
    error = e;
  }
  ok(error instanceof RangeError);
});

test('change length of array (S15.4.5.1_A1.2_T1)', function() {
  var x = new SubArray(0, undefined, 2, undefined, 4);

  x.length = 4;
  equals(x[4], undefined);

  x.length = 3;
  equals(x[3], undefined);
  equals(x[2], 2);
});

test('checking an inherited property (S15.4.5.1_A1.2_T2)', function() {
  Array.prototype[2] = -1;

  var x = new SubArray(0, 1, 2);

  equals(x[2], 2);

  x.length = 2;
  equals(x[2], -1);
});

test('checking an inherited property (S15.4.5.1_A1.2_T3)', function() {
  Array.prototype[2] = 2;
  var x = new SubArray(0, 1);
  x.length = 3;

  equals(x.hasOwnProperty('2'), false);

  x.length = 2;
  equals(x[2], 2);
});

test('length is object or primitive (S15.4.5.1_A1.3_T1)', function() {
  var x = new SubArray();
  x.length = true;
  equals(x.length, 1);

  x = new SubArray(0);
  x.length = null;

  equals(x.length, 0);

  //CHECK#3
  x = new SubArray(0);
  x.length = new Boolean(false);
  equals(x.length, 0);

  //CHECK#4
  x = new SubArray();
  x.length = new Number(1);
  equals(x.length, 1)

  //CHECK#5
  x = new SubArray();
  x.length = "1";
  equals(x.length, 1);

  //CHECK#6
  x = new SubArray();
  x.length = new String("1");
  equals(x.length, 1);
});

test('Uint32 use ToNumber and ToPrimitive (S15.4.5.1_A1.3_T2)', function() {
  var x = new SubArray();
  x.length = {valueOf: function() {return 2}};
  equals(x.length, 2);

  //CHECK#2
  x = new SubArray();
  x.length = {valueOf: function() {return 2}, toString: function() {return 1}};
  equals(x.length, 2);

  //CHECK#3
  x = new SubArray();
  x.length = {valueOf: function() {return 2}, toString: function() {return {}}};
  equals(x.length, 2);

  //CHECK#4
  try {  
    x = new SubArray();
    x.length = {valueOf: function() {return 2}, toString: function() {throw "error"}};  
    equals(x.length, 2);
  }
  catch (e) {

  }

  //CHECK#5
  x = new SubArray();
  x.length = {toString: function() {return 1}};
  equals(x.length, 1);

  //CHECK#6
  x = new SubArray();
  x.length = {valueOf: function() {return {}}, toString: function() {return 1}}
  equals(x.length, 1);

  //CHECK#7
  try {
    x = new SubArray();
    x.length = {valueOf: function() {throw "error"}, toString: function() {return 1}};  
    x.length;
  }  
  catch (e) {
    equals(e, "error");
  }

  //CHECK#8
  try {
    x = new SubArray();
    x.length = {valueOf: function() {return {}}, toString: function() {return {}}};
    x.length;
  }  
  catch (e) {
    ok(e instanceof TypeError);
  }
});

test(' P in [4294967295, -1, true] (S15.4.5.1_A2.1_T1)', function() {
  var x = new SubArray();
  x[4294967295] = 1;
  equals(x.length, 0);
  equals(x[4294967295], 1);

  //CHECK#2
  x = new SubArray();
  x[-1] = 1;
  equals(x.length, 0);
  equals(x[-1], 1);

  //CHECK#3
  x = new SubArray();
  x[true] = 1;
  equals(x.length, 0);
  equals(x[true], 1);
});

test('length === 100, P in [0, 98, 99] (S15.4.5.1_A2.2_T1)', function() {
  var x = new SubArray(100);
  x[0] = 1;
  equals(x.length, 100);

  //CHECK#2
  x[98] = 1;
  equals(x.length, 100);

  //CHECK#3
  x[99] = 1;
  equals(x.length, 100);
});

test('length = 100, P in [100, 199] (S15.4.5.1_A2.3_T1)', function() {
  var x = new SubArray(100);
  x[100] = 1;
  equals(x.length, 101);

  //CHECK#2
  x[199] = 1;
  equals(x.length, 200);
});

test('Checking boundary points (S15.4.5.2_A1_T1)', function() {
  var x = new SubArray();
  equals(x.length, 0);

  //CHECK#2
  x[0] = 1;
  equals(x.length, 1);

  //CHECK#3
  x[1] = 1;
  equals(x.length, 2);

  //CHECK#4
  x[2147483648] = 1;
  equals(x.length, 2147483649);

  //CHECK#5
  x[4294967294] = 1;
  equals(x.length, 4294967295);
});

test('P = "2^32 - 1" is not index array (S15.4.5.2_A1_T2)', function() {
  var x = new SubArray;
  x[4294967295] = 1;
  equals(x.length, 0);

  //CHECK#2
  var y = new SubArray;
  y[1] = 1;
  y[4294967295] = 1;
  equals(y.length, 2);
});

test('Checking length property (S15.4.5.2_A2_T1)', function() {
  var x = new SubArray;
  equals(x.length, 0);

  //CHECK#2
  x[0] = 1;
  equals(x.length, 1);

  //CHECK#3
  x[1] = 1;
  equals(x.length, 2);

  //CHECK#4
  x[9] = 1;
  equals(x.length, 10)
});

test('S15.4.5.2_A3_T1', function() {
  var x = new SubArray;
  x.length = 1;
  equals(x.length, 1);

  //CHECK#2
  x[5] = 1;
  x.length = 10;
  equals(x.length, 10);

  //CHECK#3
  equals(x[5], 1);
});

test('S15.4.5.2_A3_T2', function() {
  var x = new SubArray;
  x[1] = 1;
  x[3] = 3;
  x[5] = 5;
  x.length = 4;
  equals(x.length, 4);

  //CHECK#2
  equals(x[5], undefined);

  //CHECK#3
  equals(x[3], 3);

  //CHECK#4
  x.length = new Number(6);
  equals(x[5], undefined);

  //CHECK#5
  x.length = 0;
  equals(x[0], undefined);

  //CHECK#6
  x.length = 1;
  equals(x[1], undefined);
});

test('[[Put]] (length, 4294967296) (S15.4.5.2_A3_T3)', function() {
  var x = new SubArray;
  x.length = 4294967295;
  equals(x.length, 4294967295);

  //CHECK#2
  var error;
  try {
    x = new SubArray;
    x.length = 4294967296;
  } catch(e) {    
    error = e;
  }
  ok(error instanceof RangeError);
});

// test('S15.4.5.2_A3_T4', function() {
//   var x = new SubArray(0,1,2); 
//   x[4294967294] = 4294967294; 
//   x.length = 2;
// 
//   //CHECK#1
//   equals(x[0], 0);
// 
//   //CHECK#2
//   equals(x[1], 1);
// 
//   //CHECK#3
//   equals(x[2], undefined);
// 
//   //CHECK#4
//   equals(x[4294967294], undefined);
// });
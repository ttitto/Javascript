function solve(args) {
    var rgx = /[)(\s]/;
    var nums = args[0].split(rgx);
    nums = nums.map(function (a) {
        if (a != '') {
            return parseInt(a);
        } else return;
    });
    nums = nums.filter(function (a) {
        return typeof (a) !== 'undefined';
    })

    var maxLen = 1;
    var currLen = 1;
    var isEven = (nums[0] % 2 == 0);
    for (var i = 1; i < nums.length; i++) {
        toggleOddEven();
        if ((nums[i] % 2 == 0) == isEven || nums[i] == 0) {
            currLen++;
            if (maxLen < currLen) {
                maxLen = currLen;
            }
        } else {
            toggleOddEven();
            currLen = 1;
        }
    }

   // console.log(maxLen);
    return maxLen;
    //function definitions
    function toggleOddEven() {
        isEven = !isEven;
    }


}//end solve function

solve(['(3) (22) (-18) (55) (44) (3) (21)']);
solve(['(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)']);
solve(['  ( 2 )  ( 33 ) (1) (4)   (  -1  ) ']);
solve(['(102)(103)(0)(105)  (107)(1)']);
solve(['(2) (2) (2) (2) (2)']);

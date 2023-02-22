var numDupDigitsAtMostN = function(n) {
    let str = n.toString(), size = str.length, memo = new Map();
    return dp(0, 0, 1, 0);
    
    function dp(i, mask, state, hasRepeat) {
      if (i === size) return state < 2 && hasRepeat ? 1 : 0;
      let key = `${i},${mask},${state},${hasRepeat}`;
      if (memo.has(key)) return memo.get(key);
      
      let ans = hasRepeat;
      for (let digit = 0; digit <= 9; digit++) {
        if (i === 0 && digit === 0) continue;
        let newMask = mask | (1 << digit), repeat = hasRepeat || (mask === newMask ? 1 : 0);
        if (digit < Number(str[i])) {
          ans += dp(i + 1, newMask, state === 1 ? 0 : state, repeat);
        } else if (digit === Number(str[i])) {
          ans += dp(i + 1, newMask, state, repeat);
        } else {
          ans += dp(i + 1, newMask, state === 1 ? 2 : state, repeat);
        }
      }
      memo.set(key, ans);
      return ans;
    }  
  };
(function () {
  const sexEl = document.getElementById('sex');
  const weightEl = document.getElementById('weight');
  const bodyfatEl = document.getElementById('bodyfat');
  const heightEl = document.getElementById('height');

  const leanEl = document.getElementById('lean-mass');
  const ffmiEl = document.getElementById('ffmi-value');
  const classEl = document.getElementById('ffmi-class');

  const form = document.getElementById('ffmi-form');
  const resetBtn = document.getElementById('reset-btn');

  const fmt = (n) => Number.isFinite(n) ? n.toFixed(2) : '—';

  function calcLeanMass(kg, bfPct){
    return kg * (1 - bfPct / 100);
  }

  function calcFfmi(leanMassKg, heightCm){
    if (leanMassKg <= 0 || heightCm <= 0) return NaN;
    const hm = heightCm / 100;
    return leanMassKg / (hm * hm);
  }

  function classifyFFMI(sex, ffmi){
    if (!Number.isFinite(ffmi)) return '—';
    if (sex === 'male'){
      if (ffmi < 18) return '低於平均';
      if (ffmi < 20) return '平均';
      if (ffmi < 22) return '高於平均';
      if (ffmi < 23) return '優秀';
      if (ffmi < 26) return '非常優秀';
      if (ffmi < 28) return '可能使用類固醇';
      return '非常有可能使用類固醇';
    }else{ // female
      if (ffmi < 15) return '低於平均';
      if (ffmi < 17) return '平均';
      if (ffmi < 18) return '高於平均';
      if (ffmi < 19) return '優秀';
      if (ffmi < 21.5) return '非常優秀';
      if (ffmi < 25) return '可能使用類固醇';
      return '非常有可能使用類固醇';
    }
  }

  function show(lean, ffmi, cls){
    leanEl.textContent = Number.isFinite(lean) ? fmt(lean) + ' kg' : '—';
    ffmiEl.textContent = fmt(ffmi);
    classEl.textContent = cls;
  }

  show(NaN, NaN, '—');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const sex = sexEl.value;
    const w = parseFloat(weightEl.value);
    const bf = parseFloat(bodyfatEl.value);
    const h = parseFloat(heightEl.value);

    if (![w,bf,h].every(Number.isFinite) || w<=0 || h<=0 || bf<0 || bf>100){
      show(NaN, NaN, '—');
      alert('請輸入有效的體重/體脂/身高數值。');
      return;
    }

    const lean = calcLeanMass(w, bf);
    const ffmi = calcFfmi(lean, h);
    const cls = classifyFFMI(sex, ffmi);
    show(lean, ffmi, cls);
  });

  resetBtn.addEventListener('click', () => {
    weightEl.value = '';
    bodyfatEl.value = '';
    heightEl.value = '';
    show(NaN, NaN, '—');
    weightEl.focus();
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const needle = document.getElementById("needleGroup");
  const verdict = document.getElementById("gaugeVerdict");
  const dot = document.getElementById("pulseDot");
  const banner = document.querySelector(".result-banner");
  const form = document.getElementById("predictForm");

  // Needle rotates between -85deg (low / No) and 85deg (high / Yes)
  const setNeedle = (deg) => {
    needle.style.transform = `rotate(${deg}deg)`;
  };

  if (banner) {
    const isYes = banner.classList.contains("result-yes");
    setNeedle(isYes ? 75 : -75);
    verdict.textContent = isYes ? "High likelihood" : "Low likelihood";
    verdict.style.color = isYes ? "#34d399" : "#f87171";
  } else {
    setNeedle(0);
    verdict.textContent = "Awaiting input";
  }

  // While the form is submitting, show a "thinking" pulse on the gauge
  if (form) {
    form.addEventListener("submit", () => {
      verdict.textContent = "Scoring…";
      verdict.style.color = "#8996ab";
      dot.style.background = "#22d3ee";
      let deg = -75;
      let dir = 1;
      const spin = setInterval(() => {
        deg += dir * 12;
        if (deg > 75 || deg < -75) dir *= -1;
        setNeedle(deg);
      }, 90);
      // Safety clear in case navigation is slow; the page will reload on response anyway
      setTimeout(() => clearInterval(spin), 8000);
    });
  }
});

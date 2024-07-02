document.addEventListener('DOMContentLoaded', () => {
  const kaarten = Array.from(document.querySelectorAll('.memory-kaart'));
  let geklikteKaart = null;
  let bordGeblokkeerd = false;
  let naam;

  document.getElementById("OKbutton").onclick = () => {
    naam = document.getElementById("eigenTekst").value;
    document.getElementById("h1").textContent = `Welkom bij Memory, ${naam}!`;
  };

  kaarten.forEach(kaart => kaart.addEventListener('click', draaiKaartOm));

  function draaiKaartOm() {
    if (bordGeblokkeerd || this === geklikteKaart || this.classList.contains('flip')) return;

    this.classList.add('flip');

    if (!geklikteKaart) {
      geklikteKaart = this;
    } 
    else {
      bordGeblokkeerd = true;
      controleerMatch(this);
    }
  }

  function controleerMatch(tweedeKaart) {
    const eersteKaart = geklikteKaart;
    let isMatch = eersteKaart.dataset.framework === tweedeKaart.dataset.framework;

    isMatch ? deactiveerKaarten(eersteKaart, tweedeKaart) : draaiKaartenTerug(eersteKaart, tweedeKaart);
  }

  function deactiveerKaarten(eersteKaart, tweedeKaart) {
    eersteKaart.removeEventListener('click', draaiKaartOm);
    tweedeKaart.removeEventListener('click', draaiKaartOm);
    resetBord();
  }

  function draaiKaartenTerug(eersteKaart, tweedeKaart) {
    setTimeout(() => {
      eersteKaart.classList.remove('flip');
      tweedeKaart.classList.remove('flip');
      resetBord();
    }, 1500);
  }

  function resetBord() {
    [geklikteKaart, bordGeblokkeerd] = [null, false];
  }

  (function schudden() {
    kaarten.forEach(kaart => {
      let randomPos = Math.floor(Math.random() * 12);
      kaart.style.order = randomPos;
    });
  })();
});
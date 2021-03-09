const calculateHealthColor = (health) => {
  if (health > 20) {
    return "rgb(196 255 196)";
  } else if (health > 5) {
    let valRlimitA = 243;
    let valGlimitA = 255;
    let valBlimitA = 179;

    let valRlimitB = 196;
    let valGlimitB = 255;
    let valBlimitB = 196;

    let valueFinalR =
      ((20 - health) / 10) * (valRlimitA - valRlimitB) + valRlimitB;
    let valueFinalG =
      ((20 - health) / 10) * (valGlimitA - valGlimitB) + valGlimitB;
    let valueFinalB =
      ((20 - health) / 10) * (valBlimitB - valBlimitA) + valBlimitA;

    return `rgb(${valueFinalR} ${valueFinalG} ${valueFinalB})`;
  } else {
    let valRlimitA = 243;
    let valGlimitA = 255;
    let valBlimitA = 179;

    let valRlimitB = 255;
    let valGlimitB = 196;
    let valBlimitB = 204;

    let valueFinalR =
      ((10 - health) / 10) * (valRlimitB - valRlimitA) + valRlimitA;
    let valueFinalG =
      ((10 - health) / 10) * (valGlimitB - valGlimitA) + valGlimitA;
    let valueFinalB =
      ((10 - health) / 10) * (valBlimitB - valBlimitA) + valBlimitA;

    return `rgb(${valueFinalR} ${valueFinalG} ${valueFinalB})`;
  }
};

export default calculateHealthColor;

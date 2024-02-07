function calculateBAC(gramsEthanol, weightLbs, gender, hoursElapsed) {
    const poundsToKg = 0.453592; // Conversion factor from pounds to kilograms
    const weightKg = weightLbs * poundsToKg;
    const alcoholDistributionRatio = gender === 'male' ? 0.68 : 0.55;
    const bodyWaterConstant = weightKg * alcoholDistributionRatio;
    const eliminationConstant = 0.015; // Average alcohol elimination rate per hour
  
    const estimatedBAC = (gramsEthanol / bodyWaterConstant) - (eliminationConstant * hoursElapsed);
    return Math.max(0, estimatedBAC); // BAC should not be negative, return 0 if negative
  }

  
const gramsEthanol = 64;
const weightLbs = 160;
const gender = 'male';
const hoursElapsed = 0;

const estimatedBAC = calculateBAC(gramsEthanol, weightLbs, gender, hoursElapsed);

console.log(`Estimated BAC: ${estimatedBAC.toFixed(4)}`);
import EthanolOxidationImage from "../assets/ethanolOxidation.png"
import Button from "./Button/Button";

interface BacResultsProps {
    bac: number;
    totalEthanol: number;
    setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  }

const BacResults: React.FC<BacResultsProps> = ({ bac, totalEthanol, setFormSubmitted }) => {
  return (
    <div className='results-page'>
        <h1>You have consumed <em>{totalEthanol.toFixed(2)} g of ethanol</em>. Your cumulative <em>BAC is at {bac.toFixed(3)}</em>. It should take {(bac/0.015).toFixed(2)} hours since the first drink to be sober.</h1>

        {/* <button onClick={() => setFormSubmitted(false)} className="--accent-btn">Go Back</button> */}
        <Button variant="primary" size="small" onClick={() => setFormSubmitted(false)}>Go Back</Button>
        <article>
            <h2>
                About the calculations
            </h2>
            <p>
            This program was created using the Widmark Equation. The Widmark equation is a function that returns BAC based off BMI and grams of ethanol. This equation is the currently accepted function to calculate BAC; however, there are <a href ="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4361698/" target="_blank" rel="noreferrer">uncertainties</a> due to the many factors affecting alcohol metabolism. 
            </p>
            <h2>
                Alcohol Metabolism
            </h2>
            <p>
                There are two steps that need to occur before alcohol is metabolized in the body: absorption and distribution.
            </p>
            <p>
                Absorption is when the alcohol diffuses into the site of action. Alcohol is absorbed via passive diffusion meaning it passes through a membrane from a higher concentration area to a lower concentration area until an equilibrium is reached. Because of passive diffusion, higher alcohol content leads to faster absorption. This means that shots absorb faster than just sipping on a drink. Food in the stomach can also have an effect on absorption by slowing gastric emptying leading to a slow alcohol absorption. 
            </p>
            <p>
                Distribution is when the alcohol travels throughout the body. The most common factor affecting alcohol distribution is body fat since alcohol’s solubility is low in fats. This indicates that the more fat someone has the less alcohol can be distributed through the body causing a potentially higher BAC.
            </p>
            <h2>
                Alcohol In the Stomach
            </h2>
            <p>
                Although alcohol is mainly metabolized in the liver there is a very important part in alcohol metabolism which is alcohol being metabolized in the stomach. The metabolism of alcohol in the stomach is more common in non-alcoholics and those not taking H2 receptor blockers. The metabolization of alcohol is catalyzed by ADH in the stomach. The presence of ADH in the stomach can be promoted by food. 
            </p>
            <h2>
                Alcohol in the Liver
            </h2>
            <p>
                The main area in which alcohol is metabolized is the liver. The liver processes blood and metabolizes alcohol into acetaldehyde using NAD+ which gets reduced to NADH. Acetaldehyde is what gives you that dizziness when drinking. It is then further processed into acetyl CoA which is easier for the body to dispose of.
            </p>
            <img src={EthanolOxidationImage} alt="ethanol oxidation reaction"/>
            <h2>
                Other Factors 
            </h2>
            <p>
                Age can have an effect on how much ADH is present. ADH concentration is lower in older and younger people leading to slower oxidation. A person’s BMR also has an effect on how quick alcohol gets oxidized. Sugar Fructose can aid in oxidizing NADH to NAD+ leading to more alcohol being able to be oxidized. You can read everything in more detail <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3484320/" target="_blank" rel="noreferrer">here</a>
            </p>
            <h2>
                Disclaimer
            </h2>
            <p>
                Although I have tried my best to get the macronutrients from alcohol and calculated BAC using body metrics for consistency there can be many other factors that affect someone’s alcohol tolerability. Use this as a guideline for structuring your drinking as opposed to seeing if you are good to drive. I definitely recommend carrying a breathalyzer because it is a fun party accessory; as well as, accurately shows you where you’re re at. Thank’s for checking this out and cheers!
            </p>
        </article>
        
    </div>

  )
}

export default BacResults;
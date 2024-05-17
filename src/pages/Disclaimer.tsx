import styled from 'styled-components';
import { Button } from '../components/Button/Button'
import EthanolOxidationImage from '../assets/ethanolOxidation.png'; 

const DisclaimerPage = () => {
    return (
        <DisclaimerContainer>
            <Button variant="primary" size="small" onClick={() => window.history.back()}>Go Back</Button>
            <Content>
                <h1>Blood Alcohol Content (BAC) Calculator Disclaimer</h1>
                <h2>About the Calculations</h2>
                <p>
                    This program was created using the Widmark Equation. The Widmark equation is a function that returns BAC based on BMI and grams of ethanol. Although this equation is currently accepted for calculating BAC, it is not without <a href ="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4361698/" target="_blank" rel="noreferrer">uncertainties</a> due to the many factors affecting alcohol metabolism.
                </p>
                <h2>Alcohol Metabolism</h2>
                <p>
                    Alcohol metabolism involves several processes, primarily absorption and distribution. Absorption through passive diffusion leads to variances in absorption rates, influenced by alcohol concentration and the presence of food in the stomach.
                </p>
                <p>
                    Distribution varies with body fat, as alcohol has low solubility in fats. Consequently, individuals with higher body fat percentages may experience higher BAC levels.
                </p>
                <h2>Alcohol in the Stomach and Liver</h2>
                <p>
                    Alcohol is metabolized in the stomach and liver. In the stomach, alcohol metabolism can be affected by factors such as food presence and individual metabolism rates. The liver is the primary site for alcohol metabolism, transforming alcohol into acetaldehyde.
                </p>
                <img src={EthanolOxidationImage} alt="Ethanol Oxidation Reaction"/>
                <h2>Other Factors</h2>
                <p>
                    Age, basal metabolic rate (BMR), and diet (e.g., fructose intake) can also influence alcohol metabolism rates.
                </p>
                <h2>Legal Disclaimer</h2>
                <p>
                    The information and tools provided by this BAC calculator are for entertainment and educational purposes only and are not intended for medical advice or to determine whether it is safe to drive or engage in any other activity. Factors such as individual health, medication, psychological conditions, and recent food intake can significantly affect BAC levels.
                </p>
                <p>
                    Always use a breathalyzer or consult a professional for accurate measurements. Do not rely solely on this tool to gauge fitness to drive or perform tasks. The creators of this tool do not condone the unsafe or illegal use of alcohol and accept no responsibility for actions taken based on the information provided by this tool.
                </p>
                <p>
                    For more detailed insights into alcohol metabolism, please visit our referenced studies.
                </p>
            </Content>
        </DisclaimerContainer>
    );
};

export default DisclaimerPage;

const DisclaimerContainer = styled.div`
  padding: 20px;
  background-color: var(--background);
  color: white;
  min-height: 100vh;
`;

const Content = styled.article`
  max-width: 800px;
  margin: auto;
  text-align: justify;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  h2 {
    color: var(--accent);
  }

  p, a {
    line-height: 1.6;
    color: white;
  }

  a {
    color: var(--toastify-color-progress-dark);
    text-decoration: none;
  }

  img {
    display: block;
    max-width: 100%;
    margin: 20px auto;
  }
`;

import {useState} from 'react'

function Aprrove() {

    const Accordion = ({ title, content }) => {
        const [isOpen, setIsOpen] = useState(false);
      
        const toggleAccordion = () => {
          setIsOpen(!isOpen);
        };
      
        return (
          <div className="accordion">
            <div className="accordion-header" onClick={toggleAccordion}>
              <h2>{title}</h2>
              <span>{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && <div className="accordion-content">{content}</div>}
          </div>
        );
      };

  return (
    <div className="App">
    <Accordion title="Section 1" content="This is the content for section 1" />
    <Accordion title="Section 2" content="This is the content for section 2" />
    <Accordion title="Section 3" content="This is the content for section 3" />
  </div>
  )
}

export default Aprrove
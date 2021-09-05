import React, {
  FC,
}                                               from 'react';
import Modal                                    from "react-modal";
import {FontAwesomeIcon}                        from "@fortawesome/react-fontawesome";
import {faTimes}                                from '@fortawesome/free-solid-svg-icons'
import 'components/StarWarsPersonInfoModal/index.css'
import AdditionalPersonInfo                     from "components/AdditionalPersonInfo/AdditionalPersonInfo";
import {StarWarsPerson}                         from "sdk/hooks/starWarsPeople/useStarWarsPeopleSdk";
import {ADDITIONAL_STAR_WARS_PERSON_INFO_NAMES} from "../../constants";

interface StarWarsPersonInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  person: StarWarsPerson;
}

const StarWarsPersonInfoModal: FC<StarWarsPersonInfoModalProps> = ({
                                                                     isOpen,
                                                                     onClose,
                                                                     label,
                                                                     person
                                                                   }) => {
  return <Modal
    isOpen={isOpen}
    style={{
      content: {
        width:  500,
        margin: '1em auto',
      },
      overlay: {
        background: 'rgba(0, 0, 0, 0.5)'
      }
    }}
    onRequestClose={onClose}
    contentLabel={label}
  >
    <div className="modal-header">
      <h1>{label}</h1>
      <FontAwesomeIcon
        icon={faTimes}
        className="svg-button"
        size="2x"
        onClick={onClose}
      />
    </div>
    {ADDITIONAL_STAR_WARS_PERSON_INFO_NAMES.map((name) => (
      <AdditionalPersonInfo key={name} name={name} urlList={person[`${name}s`]} />
    ))}
  </Modal>
};

export default StarWarsPersonInfoModal;

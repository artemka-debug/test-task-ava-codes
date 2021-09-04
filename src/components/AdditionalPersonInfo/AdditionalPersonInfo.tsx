import React, {FC}                              from 'react';
import {useAdditionalInfo}                      from "../../hooks/useAdditionalInfo";
import {ADDITIONAL_STAR_WARS_PERSON_INFO_NAMES} from "../../constants";
import {
  cardinalToRoman,
  upperFirst
}                                               from "utils";
import {RequestStatus}                          from "../../sdk/hooks/useStarWarsSdk";

interface AdditionalPersonInfoProps {
  urlList: string[];
  name: typeof ADDITIONAL_STAR_WARS_PERSON_INFO_NAMES[number];
}

const getInfoFromAdditionalInfo = (
  name: typeof ADDITIONAL_STAR_WARS_PERSON_INFO_NAMES[number],
  infos: any[]
) => {
  if (name === 'films') {
    return infos.map((info) => `Episode ${cardinalToRoman(info.episode_id)}`)
  }

  return infos.map((info) => info.name)
}

const AdditionalPersonInfo: FC<AdditionalPersonInfoProps> = ({
                                                               urlList,
                                                               name
                                                             }) => {
  const {
          results,
          error,
          status
        } = useAdditionalInfo(name, urlList);

  return (
    <div>
      <h3>{upperFirst(name)}: {
        (status === RequestStatus.NotUsed || results?.length === 0) && `No ${name} was found`
      }</h3>
      {error ?
        <div>There was an error getting {name}</div> :
          status === RequestStatus.Loading ||
          results === null ?
          <div>Loading {name}...</div> :
          <ul>
            {getInfoFromAdditionalInfo(name, results).map((info) => <li key={info}>{info}</li>)}
          </ul>
      }
    </div>
  )
};

export default AdditionalPersonInfo;

import axios from "axios";
import { Diagnosis } from "../EntryType";

import { apiBaseUrl } from "../constants";

const getAllDiagnosis = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

export default {
  getAllDiagnosis
};


export const UpdateFormShirt = (prevFormData, shirtData) => ({
  SName: {
    ...prevFormData.SName,
    fullname: shirtData.SName?.fullname || "",
    color: shirtData.SName?.color || "",
    position_n: shirtData.SName?.position_n || "",
  },
  SUndername: {
    ...prevFormData.SUndername,
    under_name: shirtData.SUndername?.under_name || "",
    color0: shirtData.SUndername?.color0 || "",
  },
  SSchool: {
    ...prevFormData.SSchool,
    name: shirtData.SSchool?.name || "",
    color1: shirtData.SSchool?.color1 || "",
    position_s: shirtData.SSchool?.position_s || "",
  },
  SUnderschool: {
    ...prevFormData.SUnderschool,
    under_school: shirtData.SUnderschool?.under_school || "",
    color01: shirtData.SUnderschool?.color01 || "",
  },
  SLogo: {
    ...prevFormData.SLogo,
    school_name: shirtData.SLogo?.school_name || "",
    image_path: shirtData.SLogo?.image_path || "",
    position_l: shirtData.SLogo?.position_l || "",
  },
  dot: {
    ...prevFormData.dot,
    type: shirtData.dot?.type || "",
    position: shirtData.dot?.position || "",
    amount_dot: shirtData.dot?.amount_dot || "",
    color_dot: shirtData.dot?.color_dot || "",
  },
});

export const updateChecksAndLogo = (shirtData, setCheckFunctions) => {
  const {
    setcheck_dot,
    setcheck_logo,
    setcheck_undername,
    setcheck_underschool,
    setSelectedLogo,
  } = setCheckFunctions;

  if (shirtData?.dot?.type) {
    setcheck_dot(true);
  }
  if (shirtData?.SLogo?.image_path) {
    setcheck_logo(true);
    setSelectedLogo({
      label: shirtData.SLogo.school_name,
      image: shirtData.SLogo.image_path,
    });
  }
  if (shirtData?.SUndername?.under_name) {
    setcheck_undername(true);
  }
  if (shirtData?.SUnderschool?.under_school) {
    setcheck_underschool(true);
  }
};

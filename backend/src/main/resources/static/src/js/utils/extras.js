function addFeature() {
  const input = document.getElementById("featureInput");
  const feature = input.value.trim();
  if (feature !== "") {
    let li = document.createElement("li");
    li.textContent = feature;
    document.getElementById("featurei-list").appendChild(li);
    input.value = "";
  }
}

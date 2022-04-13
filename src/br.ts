export default function br(vehicle: string): string {
  if (vehicle === "he-177a-5") {
    return "6.0";
  }
  if (vehicle === "z_1007_bis_serie3") {
    return "2.7";
  }
  if (vehicle === "z_1007_bis_serie5") {
    return "3.0";
  }
  if (vehicle === "b-17e") {
    return "4.7";
  }
  if (vehicle === "leo_451_early") {
    return "3.0";
  }
  if (vehicle === "mb_175t") {
    return "3.3";
  }
  if (vehicle === "pb4y-2") {
    return "5.3";
  }
  let inp = "";
  while (inp.search(/\d{1,2}\.0|\d{1,2}\.3|\d{1,2}\.7/g)) {
    const input = prompt("Input BR: ");
    //check this
    console.log(typeof input);
    if (typeof input === "string") {
      inp = input;
    }
  }
  return inp;
}

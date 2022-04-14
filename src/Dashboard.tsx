import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { AppBar } from "@mui/material";
import { useDropzone } from "react-dropzone";
import $ from "jquery";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { base64Image, brb, Corrected, Parsed } from "./atom";
import changeParsed from "./selectors";

function MyDropzone(): JSX.Element {
  const setCorrected = useSetRecoilState(Corrected);
  const setParsed = useSetRecoilState(Parsed);
  const setImage = useSetRecoilState(base64Image);
  const setBRB = useSetRecoilState(brb);
  const onDrop = React.useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        // Do whatever you want with the file contents
        console.log(file);
        //check this
        console.log(typeof reader.result);
        if (typeof reader.result === "string") {
          const imgg: string = btoa(reader.result);
          console.log(reader.result);
          setImage(() => "data:image/png;base64," + imgg);

          const formData = new FormData();
          formData.append("base64Image", "data:image/png;base64," + imgg);
          formData.append("language", "eng");
          formData.append("OCREngine", "2");
          formData.append("apikey", "K83430880088957");

          $.ajax({
            url: "https://api.ocr.space/parse/image",
            data: formData,
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false,
            type: "POST",
          }).done(async (msg) => {
            const aray = msg.ParsedResults[0].ParsedText.split("\n");
            const sakke: { name: string; id: number }[] = [];
            for (let index = 0; index < aray.length; index++) {
              const element = aray[index];
              const obj = {
                name: element,
                id: index + 1,
              };
              sakke.push(obj);
            }
            setParsed(() => sakke);
            const luikka = await changeParsed(sakke);
            console.log(luikka);
            setCorrected(() => luikka.result);
            setBRB(()=> luikka.br);
          });
        } else {
          console.error("not string");
        }
      };
      reader.readAsBinaryString(file);
    });
  }, [setBRB, setCorrected, setImage, setParsed]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      <p>
        Drag &apos;n&apos; drop the image here, or click to select the image
      </p>
    </div>
  );
}

const mdTheme = createTheme();

function ParsedImage() {
  const b64Image = useRecoilValue(base64Image);
  if (b64Image === "") {
    return (
      <div style={{ gridColumn: "1/2", gridRow: "2/3" }}>
        Upload image to begin
      </div>
    );
  } else {
    return (
      <div style={{ gridColumn: "1/2", gridRow: "2/3" }}>
        <img src={b64Image} />
      </div>
    );
  }
}

function Br() {
  const correct: { name: string; br: number }[] = useRecoilValue(Corrected);
  
  if (correct[0] === undefined) {
    return null;
  } else {
    return (
      <Typography>BR: {correct[0].br} - {correct[0].br -1}</Typography>
    );
  }
}

function DashboardContent() {
  const parsed: [] = useRecoilValue(Parsed);
  const correct: [] = useRecoilValue(Corrected);
  const br = useRecoilValue(brb);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
            
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Air RB Br calculator
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Dropzone */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <MyDropzone />
                </Paper>
              </Grid>
              {/* BR */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                ><Typography>Your br: {br}</Typography><Br/></Paper>
              </Grid>
              {/* Parsed text */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "grid",
                    gridTemplateRows: "min-content 1fr",
                  }}
                >
                  <ParsedImage />
                  <Typography style={{ gridColumn: "2/3" }}>
                    Parsed text:{" "}
                  </Typography>
                  <Typography style={{ gridColumn: "3/4" }}>
                    Corrected text:{" "}
                  </Typography>
                  <div style={{ gridColumn: "2/3" }}>
                    {parsed.map(({ name, id }) => {
                      return <div key={id}>{name}</div>;
                    })}
                  </div>
                  <div style={{ gridColumn: "3/4" }}>
                    {correct.map(({ name, id, br }) => {
                      return <div key={id}>{name} | BR: {br}</div>;
                    })}
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
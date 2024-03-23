import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollbar from './HorizantalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        const bodyPartsData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          exerciseOptions
        );
        setBodyParts(["all", ...bodyPartsData]);
      } catch (error) {
        console.error("Error fetching body parts:", error);
      }
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search.trim() !== "") {
      try {
        const exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        );
        const searchedExercises = exercisesData.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.target.toLowerCase().includes(search.toLowerCase()) ||
            item.equipment.toLowerCase().includes(search.toLowerCase()) ||
            item.bodyPart.toLowerCase().includes(search.toLowerCase())
        );
        setExercises(searchedExercises);
      } catch (error) {
        console.error("Error searching exercises:", error);
      }
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="49px"
        textAlign="center"
      >
        Awesome Exercises You Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "1170px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#FF2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "173px", xs: "80px" },
            height: "56px",
            position: "absolute",
            right: "0px",
            fontSize: { lg: "20px", xs: "14px" },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        {bodyParts.length > 0 ? (
          <HorizontalScrollbar
            data={bodyParts}
            setBodyPart={setBodyPart}
            bodyPart={bodyPart}
          />
        ) : (
          <Typography>No body parts available.</Typography>
        )}
      </Box>
    </Stack>
  );
};

export default SearchExercises;

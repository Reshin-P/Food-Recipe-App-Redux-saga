import { Col, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import "./app.css";
import { useDispatch, useSelector } from "react-redux";
import { TypeSpecimen } from "@mui/icons-material";
import * as types from "../redux/actionTypes";
function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const arr = [2, 3, 4, 5, 8, 9];

  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const updateSearch = () => {
    setQuery(search);
    setSearch("");
  };
  useEffect(() => {
    dispatch({ type: types.FETCH_RECIPE_START, payload: query });
  }, [query]);
  const recipes = useSelector((state) => state.data.recipes);

  return (
    <div>
      <div className="searchBar">
        <form>
          <TextField
            id="outlined-basic"
            label="chicken"
            variant="outlined"
            type={"text"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ width: "80px", height: "50px" }}
            onClick={updateSearch}
          >
            Search
          </Button>
        </form>
        <div></div>
      </div>
      <Row className="mainRow">
        {recipes &&
          recipes.hits &&
          recipes.hits.map((item) => (
            <Col className="colMain" sm={1} md={3} xl={2}>
              <Card sx={{ maxWidth: 400 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={item.recipe.label}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={item.recipe.image}
                  alt="Paella dish"
                />
                <CardContent></CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>incrediants:</Typography>
                    {item.recipe.ingredientLines.map((elemet) => (
                      <Typography paragraph>{elemet}</Typography>
                    ))}
                  </CardContent>
                </Collapse>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default App;

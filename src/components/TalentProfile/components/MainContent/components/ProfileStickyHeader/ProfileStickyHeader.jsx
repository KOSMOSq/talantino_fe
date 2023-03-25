import { AppBar, Toolbar, Button } from "@mui/material";

function ProfileStickyHeader() {
  const profileSubPages = ["Overview", "Proofs"];

  const handleClick = (e) => {
      
  }

  return (
    <AppBar position="sticky" color="inherit" sx={{boxShadow:"0 1px 0 0 #888888", height: "7vh", marginTop: "1vh"}}>
      <Toolbar variant="dense" sx={{ display: "flex"}}>
        {profileSubPages.map((item) => {
          let itemLowerCase = item.toLocaleLowerCase();
          return (
            <Button
              key = {itemLowerCase}
              onClick={handleClick}
              sx={{  padding: "10px", fontSize: 14}}>
              {item}
            </Button>)
          })}
      </Toolbar>
    </AppBar>
  )
}

export { ProfileStickyHeader };
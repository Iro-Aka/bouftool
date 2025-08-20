import { Stack, stackClasses, Typography } from "@mui/material";
import { StackGrid } from "src/front/components/Layout/StackGrid";
import { StackRow } from "src/front/components/Layout/StackRow";
import { BreedFaceIcon } from "src/front/components/Wakfu/BreedFaceIcon";
import { ItemSlot } from "src/front/components/Wakfu/ItemSlot";
import { WakfuStats } from "src/wakfu/types/action";
import { WakfuEquipmentPosition } from "src/wakfu/types/itemType";
import { SearchEquipments } from "../../SearchEquipments";
import { useBuildDetailsContext } from "./context";
import { BuildDetailsNavbar } from "./Navbar";
import { BuildStats } from "./stats";

export const BuildDetails = () => {
  const build = useBuildDetailsContext();
  return (
    <Stack sx={{ flex: 1, flexDirection: "row", overflow: "hidden" }}>
      <Stack
        sx={{
          flex: "0 0 450px",
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          p: 1,
          gap: 1,
        }}
      >
        <StackRow sx={{ "&&": { alignItems: "start" } }}>
          <Stack sx={{ border: (theme) => `1px solid ${theme.palette.border.light}`, borderRadius: 1 }}>
            <BreedFaceIcon width={44}>{build.breed}</BreedFaceIcon>
          </Stack>
          <Stack>
            <Typography variant="subtitle2">Iro Kaen (Berserk)</Typography>
            <Typography variant="caption">Niv. 170</Typography>
          </Stack>
        </StackRow>
        <StackGrid
          columns={7}
          gap={0.5}
          sx={{ bgcolor: "surface.100", borderRadius: 2, boxShadow: "inset 0 0 0 black", py: 1.25, px: 1, my: 0.5 }}
        >
          {Object.values(WakfuEquipmentPosition).map((position) => (
            <ItemSlot
              key={position}
              position={position}
              item={build.items[position]}
              size={48}
              slotProps={{ box: { sx: { flex: "0 0 auto" } } }}
            />
          ))}
        </StackGrid>
        <StackGrid
          columns={4}
          sx={{
            border: (theme) => `1px solid ${theme.palette.border.light}`,
            borderRadius: 2,
            overflow: "hidden",
            [`& > .${stackClasses.root}`]: {
              "&:nth-of-type(2n)": { bgcolor: "surface.250" },
              "&:nth-of-type(2n+1)": { bgcolor: "surface.150" },
              px: 1,
              py: 0.5,
            },
          }}
        >
          <BuildStats stats={WakfuStats.PV} value={(100326).toLocaleString("fr-FR")} statsColor="#E34A53" />
          <BuildStats stats={WakfuStats.PA} value={(13).toLocaleString("fr-FR")} statsColor="#19ADD5" />
          <BuildStats stats={WakfuStats.PM} value={(5).toLocaleString("fr-FR")} statsColor="#96B443" />
          <BuildStats stats={WakfuStats.PW} value={(6).toLocaleString("fr-FR")} statsColor="#32D4CA" />
        </StackGrid>
        <Typography variant="subtitle2" sx={{ alignSelf: "center" }}>
          Maîtrises et Résistances
        </Typography>
        <StackGrid
          columns={4}
          sx={{
            border: (theme) => `1px solid ${theme.palette.border.light}`,
            borderRadius: 2,
            overflow: "hidden",
            [`& > .${stackClasses.root}`]: {
              "&:nth-of-type(2n)": { bgcolor: "surface.250" },
              "&:nth-of-type(2n+1)": { bgcolor: "surface.150" },
              px: 1,
              py: 0.5,
            },
          }}
        >
          <BuildStats
            stats={WakfuStats.MasteryFire}
            value={(836).toLocaleString("fr-FR")}
            hideLabel
            statsColor="#DD8231"
          />
          <BuildStats
            stats={WakfuStats.MasteryWater}
            value={(329).toLocaleString("fr-FR")}
            hideLabel
            statsColor="#88DBDA"
          />
          <BuildStats
            stats={WakfuStats.MasteryEarth}
            value={(789).toLocaleString("fr-FR")}
            hideLabel
            statsColor="#A9BE1F"
          />
          <BuildStats
            stats={WakfuStats.MasteryAir}
            value={(516).toLocaleString("fr-FR")}
            hideLabel
            statsColor="#CE87DD"
          />
        </StackGrid>
        <StackGrid
          columns={4}
          sx={{
            border: (theme) => `1px solid ${theme.palette.border.light}`,
            borderRadius: 2,
            overflow: "hidden",
            [`& > .${stackClasses.root}`]: {
              "&:nth-of-type(2n)": { bgcolor: "surface.250" },
              "&:nth-of-type(2n+1)": { bgcolor: "surface.150" },
              px: 1,
              py: 0.5,
            },
          }}
        >
          <BuildStats stats={WakfuStats.ResistanceFire} value="50% (318)" hideLabel statsColor="#DD8231" />
          <BuildStats stats={WakfuStats.ResistanceWater} value="56% (370)" hideLabel statsColor="#88DBDA" />
          <BuildStats stats={WakfuStats.ResistanceEarth} value="51% (325)" hideLabel statsColor="#A9BE1F" />
          <BuildStats stats={WakfuStats.ResistanceAir} value="47% (292)" hideLabel statsColor="#CE87DD" />
        </StackGrid>
        <Typography variant="subtitle2" sx={{ alignSelf: "center" }}>
          Combat
        </Typography>
        <StackGrid columns={2}>
          <Stack
            sx={{
              overflow: "hidden",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
              border: (theme) => `1px solid ${theme.palette.border.light}`,
              [`& > .${stackClasses.root}`]: {
                "&:nth-of-type(2n)": { bgcolor: "surface.250" },
                "&:nth-of-type(2n+1)": { bgcolor: "surface.150" },
                px: 1,
                py: 0.5,
              },
            }}
          >
            <BuildStats stats={WakfuStats.CriticalRate} value="44%" statsColor="#75C059" />
            <BuildStats stats={WakfuStats.CriticalRate} value="44%" statsColor="#75C059" />
            <BuildStats stats={WakfuStats.Initiative} value={(90).toLocaleString("fr-FR")} statsColor="#75C059" />
            <BuildStats stats={WakfuStats.Dodge} value={(436).toLocaleString("fr-FR")} statsColor="#75C059" />
            <BuildStats stats={WakfuStats.CriticalRate} value="44%" statsColor="#75C059" />
            <BuildStats stats={WakfuStats.Control} value={(1).toLocaleString("fr-FR")} statsColor="#75C059" />
          </Stack>
          <Stack
            sx={{
              overflow: "hidden",
              borderTopRightRadius: "8px",
              borderBottomRightRadius: "8px",
              border: (theme) => `1px solid ${theme.palette.border.light}`,
              [`& > .${stackClasses.root}`]: {
                "&:nth-of-type(2n)": { bgcolor: "surface.250" },
                "&:nth-of-type(2n+1)": { bgcolor: "surface.150" },
                px: 1,
                py: 0.5,
              },
            }}
          >
            <BuildStats stats={WakfuStats.CriticalRate} value="44%" statsColor="#75C059" />
            <BuildStats stats={WakfuStats.Block} value="13%" statsColor="#75C059" />
            <BuildStats stats={WakfuStats.Range} value={(0).toLocaleString("fr-FR")} statsColor="#9A9B9D" />
            <BuildStats stats={WakfuStats.Lock} value={(376).toLocaleString("fr-FR")} statsColor="#75C059" />
            <BuildStats stats={WakfuStats.CriticalRate} value="44%" statsColor="#75C059" />
            <BuildStats stats={WakfuStats.Willpower} value={(0).toLocaleString("fr-FR")} statsColor="#9A9B9D" />
          </Stack>
        </StackGrid>
        <Typography variant="subtitle2" sx={{ alignSelf: "center" }}>
          Secondaire
        </Typography>
        <StackGrid columns={2}>
          <Stack
            sx={{
              overflow: "hidden",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
              border: (theme) => `1px solid ${theme.palette.border.light}`,
              [`& > .${stackClasses.root}`]: {
                "&:nth-of-type(2n)": { bgcolor: "surface.250" },
                "&:nth-of-type(2n+1)": { bgcolor: "surface.150" },
                px: 1,
                py: 0.5,
              },
            }}
          >
            <BuildStats stats={WakfuStats.CriticalMastery} value="0" statsColor="#9A9B9D" />
            <BuildStats stats={WakfuStats.BackMastery} value="0" statsColor="#9A9B9D" />
            <BuildStats stats={WakfuStats.MeleeMastery} value="434" statsColor="#75C059" />
            <BuildStats stats={WakfuStats.DistanceMastery} value="0" statsColor="#9A9B9D" />
            <BuildStats stats={WakfuStats.HealingMastery} value="0" statsColor="#9A9B9D" />
            <BuildStats stats={WakfuStats.BerserkMastery} value="486" statsColor="#75C059" />
          </Stack>
          <Stack
            sx={{
              overflow: "hidden",
              borderTopRightRadius: "8px",
              borderBottomRightRadius: "8px",
              border: (theme) => `1px solid ${theme.palette.border.light}`,
              [`& > .${stackClasses.root}`]: {
                "&:nth-of-type(2n)": { bgcolor: "surface.250" },
                "&:nth-of-type(2n+1)": { bgcolor: "surface.150" },
                px: 1,
                py: 0.5,
              },
            }}
          >
            <BuildStats stats={WakfuStats.CriticalResistance} value="0" statsColor="#9A9B9D" />
            <BuildStats stats={WakfuStats.BackResistance} value="0" statsColor="#9A9B9D" />
            <BuildStats stats={WakfuStats.ArmorGiven} value="0%" statsColor="#75C059" />
            <BuildStats stats={WakfuStats.ArmorReceived} value="0%" statsColor="#75C059" />
            <BuildStats stats={WakfuStats.ArmorReceived} value="0%" statsColor="#75C059" />
            <Stack sx={{ flex: "1" }} />
          </Stack>
        </StackGrid>
      </Stack>
      <Stack sx={{ flex: 1, overflow: "hidden" }}>
        <BuildDetailsNavbar />
        <SearchEquipments />
      </Stack>
    </Stack>
  );
};

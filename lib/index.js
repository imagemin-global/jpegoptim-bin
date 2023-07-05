import fs from "node:fs";
import process from "node:process";
import { fileURLToPath } from "node:url";
import BinWrapper from "bin-wrapper";

const pkg = JSON.parse(
	fs.readFileSync(new URL("../package.json", import.meta.url))
);
const mirror =
	process.env.JPEGOPTIM_BINARY_SITE ||
	process.env.npm_config_jpegoptim_binary_site ||
	"https://raw.githubusercontent.com/imagemin/jpegoptim-bin";
const url = `${mirror}/v${pkg.version}/vendor/`;

const binWrapper = new BinWrapper()
	.src(`${url}osx/jpegoptim`, "darwin")
	.src(`${url}linux/jpegoptim`, "linux")
	.src(`${url}win32/jpegoptim.exe`, "win32")
	.dest(fileURLToPath(new URL("../vendor", import.meta.url)))
	.use(process.platform === "win32" ? "jpegoptim.exe" : "jpegoptim");

export default binWrapper;

// Generated Iconsax glossary behavior.
// Icon data lives in ./iconsax-glossary.icons.json.
const THEME_STORAGE_KEY = 'iconsax-glossary-theme';

function readStoredTheme() {
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    return theme === 'day' || theme === 'night' ? theme : null;
  } catch (_error) {
    return null;
  }
}

function getSystemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
}

async function loadIconData() {
  const response = await fetch('./iconsax-glossary.icons.json');
  if (!response.ok) throw new Error(`Failed to load icon data: ${response.status}`);
  return response.json();
}

(async () => {
  const icons = await loadIconData();
  const loadingOverlay = document.getElementById('loadingOverlay');
  const page = document.querySelector('.page');
  const styles = ['bold', 'bulk', 'outline'];
  const ui = {"book": "\n<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3.5 18.75C3.09 18.75 2.75 18.41 2.75 18V7C2.75 2.59 4.09 1.25 8.5 1.25H15.5C19.91 1.25 21.25 2.59 21.25 7V17C21.25 17.16 21.25 17.31 21.24 17.47C21.21 17.88 20.84 18.2 20.44 18.17C20.03 18.14 19.71 17.78 19.74 17.37C19.75 17.25 19.75 17.12 19.75 17V7C19.75 3.43 19.08 2.75 15.5 2.75H8.5C4.92 2.75 4.25 3.43 4.25 7V18C4.25 18.41 3.91 18.75 3.5 18.75Z\"></path><path d=\"M17 22.75H7C4.66 22.75 2.75 20.84 2.75 18.5V17.85C2.75 15.86 4.37 14.25 6.35 14.25H20.5C20.91 14.25 21.25 14.59 21.25 15V18.5C21.25 20.84 19.34 22.75 17 22.75ZM6.35 15.75C5.19 15.75 4.25 16.69 4.25 17.85V18.5C4.25 20.02 5.48 21.25 7 21.25H17C18.52 21.25 19.75 20.02 19.75 18.5V15.75H6.35Z\"></path><path d=\"M16 7.75H8C7.59 7.75 7.25 7.41 7.25 7C7.25 6.59 7.59 6.25 8 6.25H16C16.41 6.25 16.75 6.59 16.75 7C16.75 7.41 16.41 7.75 16 7.75Z\"></path><path d=\"M13 11.25H8C7.59 11.25 7.25 10.91 7.25 10.5C7.25 10.09 7.59 9.75 8 9.75H13C13.41 9.75 13.75 10.09 13.75 10.5C13.75 10.91 13.41 11.25 13 11.25Z\"></path></svg>", "moon": "\n<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12.4604 22.7501C12.2904 22.7501 12.1204 22.7501 11.9504 22.7401C6.35044 22.4901 1.67044 17.9801 1.28044 12.4801C0.940437 7.76011 3.67044 3.35011 8.07044 1.50011C9.32044 0.980114 9.98044 1.38011 10.2604 1.67011C10.5404 1.95011 10.9304 2.60011 10.4104 3.79011C9.95044 4.85011 9.72044 5.98011 9.73044 7.14011C9.75044 11.5701 13.4304 15.3301 17.9204 15.5101C18.5704 15.5401 19.2104 15.4901 19.8304 15.3801C21.1504 15.1401 21.7004 15.6701 21.9104 16.0101C22.1204 16.3501 22.3604 17.0801 21.5604 18.1601C19.4404 21.0601 16.0704 22.7501 12.4604 22.7501ZM2.77044 12.3701C3.11044 17.1301 7.17044 21.0301 12.0104 21.2401C15.3004 21.4001 18.4204 19.9001 20.3404 17.2801C20.4904 17.0701 20.5604 16.9201 20.5904 16.8401C20.5004 16.8301 20.3404 16.8201 20.0904 16.8701C19.3604 17.0001 18.6004 17.0501 17.8504 17.0201C12.5704 16.8101 8.25044 12.3801 8.22044 7.16011C8.22044 5.78011 8.49044 4.45011 9.04044 3.20011C9.14044 2.98011 9.16044 2.83011 9.17044 2.75011C9.08044 2.75011 8.92044 2.77011 8.66044 2.88011C4.85044 4.48011 2.49044 8.30011 2.77044 12.3701Z\"></path></svg>", "sun": "\n<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 9.25C11.59 9.25 11.25 8.91 11.25 8.5V3C11.25 2.59 11.59 2.25 12 2.25C12.41 2.25 12.75 2.59 12.75 3V8.5C12.75 8.91 12.41 9.25 12 9.25Z\"></path><path d=\"M12 21.75C11.59 21.75 11.25 21.41 11.25 21V15.5C11.25 15.09 11.59 14.75 12 14.75C12.41 14.75 12.75 15.09 12.75 15.5V21C12.75 21.41 12.41 21.75 12 21.75Z\"></path><path d=\"M14 3.75H10C9.59 3.75 9.25 3.41 9.25 3C9.25 2.59 9.59 2.25 10 2.25H14C14.41 2.25 14.75 2.59 14.75 3C14.75 3.41 14.41 3.75 14 3.75Z\"></path><path d=\"M14 21.75H10C9.59 21.75 9.25 21.41 9.25 21C9.25 20.59 9.59 20.25 10 20.25H14C14.41 20.25 14.75 20.59 14.75 21C14.75 21.41 14.41 21.75 14 21.75Z\"></path><path d=\"M8.97013 10.9999C8.84013 10.9999 8.71013 10.9699 8.60013 10.8999L3.84013 8.14992C3.48013 7.93992 3.36013 7.47993 3.57013 7.12993C3.78013 6.76993 4.24013 6.64992 4.59013 6.85992L9.35013 9.60992C9.71013 9.81992 9.83013 10.2799 9.62013 10.6299C9.48013 10.8699 9.23013 10.9999 8.97013 10.9999Z\"></path><path d=\"M19.7904 17.2499C19.6604 17.2499 19.5304 17.2199 19.4204 17.1499L14.6604 14.3999C14.3004 14.1899 14.1804 13.7299 14.3904 13.3799C14.6004 13.0199 15.0604 12.8999 15.4104 13.1099L20.1704 15.8599C20.5304 16.0699 20.6504 16.5299 20.4404 16.8799C20.3004 17.1199 20.0504 17.2499 19.7904 17.2499Z\"></path><path d=\"M3.21013 9.97994C3.08013 9.97994 2.95013 9.94995 2.84013 9.87995C2.48013 9.66995 2.36013 9.20994 2.57013 8.85994L4.57013 5.39994C4.78013 5.03994 5.24013 4.91995 5.59013 5.12995C5.95013 5.33995 6.07013 5.79994 5.86013 6.14994L3.86013 9.60994C3.72013 9.84994 3.46013 9.97994 3.21013 9.97994Z\"></path><path d=\"M18.7902 18.9799C18.6602 18.9799 18.5302 18.9499 18.4202 18.8799C18.0602 18.6699 17.9402 18.2099 18.1502 17.8599L20.1502 14.3999C20.3602 14.0399 20.8202 13.9199 21.1702 14.1299C21.5302 14.3399 21.6502 14.7999 21.4402 15.1499L19.4402 18.6099C19.3102 18.8499 19.0502 18.9799 18.7902 18.9799Z\"></path><path d=\"M12 16.25C10.49 16.25 9.08 15.44 8.32 14.13C7.94 13.47 7.75 12.76 7.75 12C7.75 11.24 7.94 10.53 8.32 9.88002C9.08 8.57002 10.49 7.76001 12 7.76001C13.51 7.76001 14.92 8.57002 15.68 9.88002C16.06 10.54 16.25 11.25 16.25 12.01C16.25 12.77 16.06 13.48 15.68 14.13C14.92 15.44 13.51 16.25 12 16.25ZM12 9.25002C11.02 9.25002 10.11 9.78002 9.62 10.63C9.38 11.05 9.25 11.52 9.25 12C9.25 12.48 9.37 12.95 9.62 13.38C10.11 14.23 11.02 14.76 12 14.76C12.98 14.76 13.89 14.23 14.38 13.38C14.62 12.96 14.75 12.49 14.75 12.01C14.75 11.53 14.63 11.06 14.38 10.63C13.89 9.78002 12.98 9.25002 12 9.25002Z\"></path><path d=\"M15.0304 11.0002C14.7704 11.0002 14.5204 10.8702 14.3804 10.6202C14.1704 10.2602 14.3004 9.80017 14.6504 9.60017L19.4104 6.85017C19.7704 6.64017 20.2304 6.77015 20.4304 7.12015C20.6404 7.48015 20.5104 7.94016 20.1604 8.14016L15.4004 10.8902C15.2904 10.9702 15.1604 11.0002 15.0304 11.0002Z\"></path><path d=\"M4.21012 17.2502C3.95012 17.2502 3.70012 17.1202 3.56012 16.8702C3.35012 16.5102 3.48012 16.0502 3.83012 15.8502L8.59012 13.1002C8.95012 12.8902 9.41012 13.0202 9.61012 13.3702C9.82012 13.7302 9.69012 14.1902 9.34012 14.3902L4.58012 17.1402C4.47012 17.2202 4.34012 17.2502 4.21012 17.2502Z\"></path><path d=\"M20.7902 9.97994C20.5302 9.97994 20.2802 9.84995 20.1402 9.59995L18.1402 6.13994C17.9302 5.77994 18.0602 5.31994 18.4102 5.11994C18.7702 4.90994 19.2302 5.03994 19.4302 5.38994L21.4302 8.84995C21.6402 9.20995 21.5102 9.66994 21.1602 9.86994C21.0502 9.94994 20.9202 9.97994 20.7902 9.97994Z\"></path><path d=\"M5.21012 18.9799C4.95012 18.9799 4.70012 18.8499 4.56012 18.5999L2.56012 15.1399C2.35012 14.7799 2.48012 14.3199 2.83012 14.1199C3.19012 13.9099 3.65012 14.0399 3.85012 14.3899L5.85012 17.8499C6.06012 18.2099 5.93012 18.6699 5.58012 18.8699C5.46012 18.9499 5.33012 18.9799 5.21012 18.9799Z\"></path></svg>", "search": "\n<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z\"></path><path d=\"M22.0004 22.7499C21.8104 22.7499 21.6204 22.6799 21.4704 22.5299L19.4704 20.5299C19.1804 20.2399 19.1804 19.7599 19.4704 19.4699C19.7604 19.1799 20.2404 19.1799 20.5304 19.4699L22.5304 21.4699C22.8204 21.7599 22.8204 22.2399 22.5304 22.5299C22.3804 22.6799 22.1904 22.7499 22.0004 22.7499Z\"></path></svg>", "copy": "\n<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M11.1 22.75H6.9C2.99 22.75 1.25 21.01 1.25 17.1V12.9C1.25 8.99 2.99 7.25 6.9 7.25H11.1C15.01 7.25 16.75 8.99 16.75 12.9V17.1C16.75 21.01 15.01 22.75 11.1 22.75ZM6.9 8.75C3.8 8.75 2.75 9.8 2.75 12.9V17.1C2.75 20.2 3.8 21.25 6.9 21.25H11.1C14.2 21.25 15.25 20.2 15.25 17.1V12.9C15.25 9.8 14.2 8.75 11.1 8.75H6.9Z\"></path><path d=\"M17.1 16.75H16C15.59 16.75 15.25 16.41 15.25 16V12.9C15.25 9.8 14.2 8.75 11.1 8.75H8C7.59 8.75 7.25 8.41 7.25 8V6.9C7.25 2.99 8.99 1.25 12.9 1.25H17.1C21.01 1.25 22.75 2.99 22.75 6.9V11.1C22.75 15.01 21.01 16.75 17.1 16.75ZM16.75 15.25H17.1C20.2 15.25 21.25 14.2 21.25 11.1V6.9C21.25 3.8 20.2 2.75 17.1 2.75H12.9C9.8 2.75 8.75 3.8 8.75 6.9V7.25H11.1C15.01 7.25 16.75 8.99 16.75 12.9V15.25Z\"></path></svg>", "image": "\n<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z\"></path><path d=\"M9 10.75C7.48 10.75 6.25 9.52 6.25 8C6.25 6.48 7.48 5.25 9 5.25C10.52 5.25 11.75 6.48 11.75 8C11.75 9.52 10.52 10.75 9 10.75ZM9 6.75C8.31 6.75 7.75 7.31 7.75 8C7.75 8.69 8.31 9.25 9 9.25C9.69 9.25 10.25 8.69 10.25 8C10.25 7.31 9.69 6.75 9 6.75Z\"></path><path d=\"M2.67075 19.7001C2.43075 19.7001 2.19075 19.5801 2.05075 19.3701C1.82075 19.0301 1.91075 18.5601 2.26075 18.3301L7.19075 15.0201C8.27075 14.2901 9.76075 14.3801 10.7407 15.2101L11.0707 15.5001C11.5707 15.9301 12.4207 15.9301 12.9107 15.5001L17.0707 11.9301C18.1307 11.0201 19.8007 11.0201 20.8707 11.9301L22.5007 13.3301C22.8107 13.6001 22.8507 14.0701 22.5807 14.3901C22.3107 14.7001 21.8407 14.7401 21.5207 14.4701L19.8907 13.0701C19.3907 12.6401 18.5407 12.6401 18.0407 13.0701L13.8807 16.6401C12.8207 17.5501 11.1507 17.5501 10.0807 16.6401L9.75075 16.3501C9.29075 15.9601 8.53075 15.9201 8.02075 16.2701L3.09075 19.5801C2.96075 19.6601 2.81075 19.7001 2.67075 19.7001Z\"></path></svg>", "code": "\n<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6.89088 15.75C6.61088 15.75 6.35088 15.6 6.22088 15.34C6.03088 14.97 6.18088 14.52 6.56088 14.33C7.43088 13.9 8.17088 13.24 8.70088 12.44C8.88088 12.17 8.88088 11.83 8.70088 11.56C8.16088 10.76 7.42088 10.1 6.56088 9.67002C6.18088 9.49002 6.03088 9.04002 6.22088 8.66002C6.40088 8.29002 6.85088 8.14002 7.22088 8.33002C8.32088 8.88002 9.26088 9.71002 9.94088 10.73C10.4509 11.5 10.4509 12.5 9.94088 13.27C9.26088 14.29 8.32088 15.12 7.22088 15.67C7.12088 15.72 7.00088 15.75 6.89088 15.75Z\"></path><path d=\"M17 15.75H13C12.59 15.75 12.25 15.41 12.25 15C12.25 14.59 12.59 14.25 13 14.25H17C17.41 14.25 17.75 14.59 17.75 15C17.75 15.41 17.41 15.75 17 15.75Z\"></path><path d=\"M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z\"></path></svg>", "tag": "\n<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12.0691 21.9802C10.6591 21.9802 9.23911 21.4402 8.16911 20.3702L3.63911 15.8402C2.53911 14.7402 1.95911 13.2202 2.02911 11.6702L2.26911 6.67018C2.37911 4.28018 4.26911 2.39018 6.66911 2.27018L11.6691 2.03018C13.2191 1.97018 14.7391 2.54018 15.8391 3.64018L20.3691 8.17018C22.5191 10.3202 22.5191 13.8302 20.3691 15.9802L15.9791 20.3702C14.8991 21.4402 13.4891 21.9802 12.0691 21.9802ZM4.69911 14.7702L9.22911 19.3002C9.98911 20.0602 10.9991 20.4802 12.0691 20.4802C13.1391 20.4802 14.1491 20.0602 14.9091 19.3002L19.2991 14.9102C20.0591 14.1502 20.4791 13.1402 20.4791 12.0702C20.4791 11.0002 20.0591 9.99018 19.2991 9.23018L14.7691 4.70018C13.9691 3.90018 12.8591 3.47018 11.7391 3.53018L6.73911 3.77018C5.10911 3.84018 3.83911 5.11018 3.75911 6.73018L3.51911 11.7302C3.46911 12.8602 3.89911 13.9702 4.69911 14.7702Z\"></path><path d=\"M9.5 12.75C7.71 12.75 6.25 11.29 6.25 9.5C6.25 7.71 7.71 6.25 9.5 6.25C11.29 6.25 12.75 7.71 12.75 9.5C12.75 11.29 11.29 12.75 9.5 12.75ZM9.5 7.75C8.54 7.75 7.75 8.54 7.75 9.5C7.75 10.46 8.54 11.25 9.5 11.25C10.46 11.25 11.25 10.46 11.25 9.5C11.25 8.54 10.46 7.75 9.5 7.75Z\"></path></svg>", "path": "\n<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M16.9792 13.2001C16.7892 13.2001 16.5892 13.1201 16.4492 12.9801L11.0492 7.57006C10.7992 7.32006 10.7592 6.94006 10.9492 6.64006L12.6392 3.97006C13.1092 3.23006 13.8192 2.77006 14.6492 2.68006C15.5792 2.59006 16.5392 2.95006 17.2892 3.70006L20.3192 6.73006C21.0392 7.45006 21.3992 8.42006 21.2892 9.38006C21.1992 10.2201 20.7492 10.9501 20.0492 11.3901L17.3792 13.0801C17.2592 13.1601 17.1192 13.2001 16.9792 13.2001ZM12.5292 6.94006L17.0892 11.5001L19.2592 10.1301C19.5692 9.93006 19.7692 9.61006 19.8092 9.22006C19.8692 8.72006 19.6592 8.19006 19.2692 7.80006L16.2392 4.77006C15.8092 4.34006 15.2892 4.11006 14.8192 4.18006C14.4392 4.22006 14.1292 4.43006 13.9092 4.78006L12.5292 6.94006Z\"></path><path d=\"M5.89038 21.34C5.00038 21.34 4.20038 21.02 3.60038 20.43C2.90038 19.73 2.59038 18.76 2.72038 17.68L3.70038 9.35003C4.00038 6.83003 5.11038 5.91003 7.70038 6.06003L11.6204 6.29003C12.0304 6.32003 12.3504 6.67003 12.3204 7.08003C12.2904 7.49003 11.9404 7.81003 11.5304 7.78003L7.61038 7.56003C5.83038 7.45003 5.39038 7.80003 5.19038 9.53003L4.21038 17.85C4.14038 18.46 4.30038 19 4.66038 19.36C5.03038 19.72 5.57038 19.89 6.18038 19.81L14.5004 18.83C16.2504 18.62 16.6404 18.16 16.4704 16.44L16.2304 12.49C16.2104 12.08 16.5204 11.72 16.9304 11.7C17.3404 11.67 17.7004 11.99 17.7204 12.4L17.9504 16.32C18.1904 18.81 17.2104 20.01 14.6604 20.32L6.34038 21.3C6.20038 21.33 6.04038 21.34 5.89038 21.34Z\"></path><path d=\"M4.61078 20.1698C4.42078 20.1698 4.23078 20.0998 4.08078 19.9498C3.79078 19.6598 3.79078 19.1798 4.08078 18.8898L7.12078 15.8498C7.41078 15.5598 7.89078 15.5598 8.18078 15.8498C8.47078 16.1398 8.47078 16.6198 8.18078 16.9098L5.14078 19.9498C4.99078 20.0998 4.80078 20.1698 4.61078 20.1698Z\"></path></svg>", "x": "\n<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z\"></path><path d=\"M9.16937 15.5801C8.97937 15.5801 8.78938 15.5101 8.63938 15.3601C8.34938 15.0701 8.34938 14.5901 8.63938 14.3001L14.2994 8.64011C14.5894 8.35011 15.0694 8.35011 15.3594 8.64011C15.6494 8.93011 15.6494 9.41011 15.3594 9.70011L9.69937 15.3601C9.55937 15.5101 9.35937 15.5801 9.16937 15.5801Z\"></path><path d=\"M14.8294 15.5801C14.6394 15.5801 14.4494 15.5101 14.2994 15.3601L8.63938 9.70011C8.34938 9.41011 8.34938 8.93011 8.63938 8.64011C8.92937 8.35011 9.40937 8.35011 9.69937 8.64011L15.3594 14.3001C15.6494 14.5901 15.6494 15.0701 15.3594 15.3601C15.2094 15.5101 15.0194 15.5801 14.8294 15.5801Z\"></path></svg>", "filter": "\n<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10.9308 22.75C10.4508 22.75 9.97082 22.63 9.53082 22.39C8.64082 21.89 8.11078 21 8.11078 19.99V14.64C8.11078 14.13 7.78076 13.38 7.47076 12.99L3.67078 9.00003C3.04078 8.37003 2.55078 7.27002 2.55078 6.46002V4.14005C2.55078 2.53005 3.7708 1.27002 5.3208 1.27002H18.6608C20.1908 1.27002 21.4308 2.51004 21.4308 4.04004V6.26004C21.4308 7.31004 20.8008 8.52002 20.2008 9.11002C19.9108 9.40002 19.4308 9.40002 19.1408 9.11002C18.8508 8.82002 18.8508 8.34002 19.1408 8.05002C19.5108 7.68002 19.9308 6.85004 19.9308 6.26004V4.04004C19.9308 3.34004 19.3608 2.77002 18.6608 2.77002H5.3208C4.6108 2.77002 4.05078 3.37005 4.05078 4.14005V6.46002C4.05078 6.83002 4.35078 7.56004 4.74078 7.95004L8.59082 12C9.10082 12.63 9.60077 13.69 9.60077 14.64V19.99C9.60077 20.65 10.0508 20.97 10.2508 21.08C10.6808 21.32 11.1908 21.31 11.5908 21.07L12.9908 20.17C13.2808 20 13.5608 19.45 13.5608 19.08C13.5608 18.67 13.9008 18.33 14.3108 18.33C14.7208 18.33 15.0608 18.67 15.0608 19.08C15.0608 19.98 14.5008 21.01 13.7908 21.44L12.4008 22.34C11.9508 22.61 11.4408 22.75 10.9308 22.75Z\"></path><path d=\"M16.0711 17.2701C13.8911 17.2701 12.1211 15.5001 12.1211 13.3201C12.1211 11.1401 13.8911 9.37012 16.0711 9.37012C18.2511 9.37012 20.0211 11.1401 20.0211 13.3201C20.0211 15.5001 18.2511 17.2701 16.0711 17.2701ZM16.0711 10.8701C14.7211 10.8701 13.6211 11.9701 13.6211 13.3201C13.6211 14.6701 14.7211 15.7701 16.0711 15.7701C17.4211 15.7701 18.5211 14.6701 18.5211 13.3201C18.5211 11.9701 17.4211 10.8701 16.0711 10.8701Z\"></path><path d=\"M19.8705 17.8701C19.6805 17.8701 19.4905 17.8001 19.3405 17.6501L18.3405 16.6501C18.0505 16.3601 18.0505 15.8801 18.3405 15.5901C18.6305 15.3001 19.1105 15.3001 19.4005 15.5901L20.4005 16.5901C20.6905 16.8801 20.6905 17.3601 20.4005 17.6501C20.2605 17.7901 20.0605 17.8701 19.8705 17.8701Z\"></path></svg>", "grid": "\n<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z\"></path><path d=\"M21.9993 9.25H2.0293C1.6193 9.25 1.2793 8.91 1.2793 8.5C1.2793 8.09 1.6193 7.75 2.0293 7.75H21.9993C22.4093 7.75 22.7493 8.09 22.7493 8.5C22.7493 8.91 22.4093 9.25 21.9993 9.25Z\"></path><path d=\"M21.9993 16.25H2.0293C1.6193 16.25 1.2793 15.91 1.2793 15.5C1.2793 15.09 1.6193 14.75 2.0293 14.75H21.9993C22.4093 14.75 22.7493 15.09 22.7493 15.5C22.7493 15.91 22.4093 16.25 21.9993 16.25Z\"></path><path d=\"M8.50977 22.7398C8.09977 22.7398 7.75977 22.3998 7.75977 21.9898V2.00977C7.75977 1.59977 8.09977 1.25977 8.50977 1.25977C8.91977 1.25977 9.25977 1.59977 9.25977 2.00977V21.9798C9.25977 22.3998 8.92977 22.7398 8.50977 22.7398Z\"></path><path d=\"M15.5098 22.7398C15.0998 22.7398 14.7598 22.3998 14.7598 21.9898V2.00977C14.7598 1.59977 15.0998 1.25977 15.5098 1.25977C15.9198 1.25977 16.2598 1.59977 16.2598 2.00977V21.9798C16.2598 22.3998 15.9298 22.7398 15.5098 22.7398Z\"></path></svg>", "check": "\n<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z\"></path><path d=\"M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z\"></path></svg>"};
  ui.download = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.75C8.9 17.75 8.81 17.73 8.71 17.69C8.43 17.58 8.25 17.3 8.25 17V11C8.25 10.59 8.59 10.25 9 10.25C9.41 10.25 9.75 10.59 9.75 11V15.19L10.47 14.47C10.76 14.18 11.24 14.18 11.53 14.47C11.82 14.76 11.82 15.24 11.53 15.53L9.53 17.53C9.39 17.67 9.19 17.75 9 17.75Z"></path><path d="M8.99945 17.7499C8.80945 17.7499 8.61945 17.6799 8.46945 17.5299L6.46945 15.5299C6.17945 15.2399 6.17945 14.7599 6.46945 14.4699C6.75945 14.1799 7.23945 14.1799 7.52945 14.4699L9.52945 16.4699C9.81945 16.7599 9.81945 17.2399 9.52945 17.5299C9.37945 17.6799 9.18945 17.7499 8.99945 17.7499Z"></path><path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H14C14.41 1.25 14.75 1.59 14.75 2C14.75 2.41 14.41 2.75 14 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10C21.25 9.59 21.59 9.25 22 9.25C22.41 9.25 22.75 9.59 22.75 10V15C22.75 20.43 20.43 22.75 15 22.75Z"></path><path d="M22 10.75H18C14.58 10.75 13.25 9.41999 13.25 5.99999V1.99999C13.25 1.69999 13.43 1.41999 13.71 1.30999C13.99 1.18999 14.31 1.25999 14.53 1.46999L22.53 9.46999C22.74 9.67999 22.81 10.01 22.69 10.29C22.57 10.57 22.3 10.75 22 10.75ZM14.75 3.80999V5.99999C14.75 8.57999 15.42 9.24999 18 9.24999H20.19L14.75 3.80999Z"></path></svg>';
  const state = { query: '', style: 'all', sort: 'az', selected: null, selectedStyle: 'outline', filteredIcons: [], virtualRaf: 0 };
  const els = {
    grid: document.getElementById('grid'), empty: document.getElementById('empty'), search: document.getElementById('search'), sort: document.getElementById('sort'), toast: document.getElementById('toast'),
    themeToggle: document.getElementById('themeToggle'), docsButton: document.getElementById('docsButton'), copyInterceptor: document.getElementById('copyInterceptor'), interceptorCode: document.getElementById('interceptorCode'),
    iconDialog: document.getElementById('iconDialog'), docsDialog: document.getElementById('docsDialog'), dialogIconMini: document.getElementById('dialogIconMini'), iconDialogTitle: document.getElementById('iconDialogTitle'), iconDialogSubtitle: document.getElementById('iconDialogSubtitle'),
    variantTabs: document.getElementById('variantTabs'), dialogPreview: document.getElementById('dialogPreview'), quickCopyActions: document.getElementById('quickCopyActions'), sizePreview: document.getElementById('sizePreview'), buttonPreview: document.getElementById('buttonPreview'), chipPreview: document.getElementById('chipPreview')
  };
  function applyTheme(theme, persist = false) {
    document.documentElement.dataset.theme = theme;
    els.themeToggle.innerHTML = theme === 'night' ? ui.sun : ui.moon;
    els.themeToggle.setAttribute('aria-label', theme === 'night' ? 'Switch to day theme' : 'Switch to night theme');
    if (!persist) return;
    try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch (_error) {}
  }
  applyTheme(readStoredTheme() || document.documentElement.dataset.theme || getSystemTheme());

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  const iconByName = new Map(icons.map((item) => [item.name, item]));
  const srcFor = (name, style) => `@iconsax/${style}/${name}`;
  const snippetFor = (name, style) => `<tui-svg src="${srcFor(name, style)}"></tui-svg>`;
  const preferredStyle = (item) => state.style !== 'all' && item.variants[state.style] ? state.style : (item.variants.outline ? 'outline' : item.variants.bold ? 'bold' : Object.keys(item.variants)[0]);
  let toastTimer;
  function toast(message) {
    clearTimeout(toastTimer);
    const openDialog = document.querySelector('dialog[open]');
    if (openDialog && els.toast.parentElement !== openDialog) openDialog.appendChild(els.toast);
    if (!openDialog && els.toast.parentElement !== document.body) document.body.appendChild(els.toast);
    els.toast.textContent = message;
    els.toast.classList.add('show');
    toastTimer = setTimeout(() => {
      els.toast.classList.remove('show');
      if (!document.querySelector('dialog[open]') && els.toast.parentElement !== document.body) document.body.appendChild(els.toast);
    }, 1800);
  }
  async function copyText(value, label) {
    try { await navigator.clipboard.writeText(value); }
    catch (_error) { const textarea = document.createElement('textarea'); textarea.value = value; textarea.style.position = 'fixed'; textarea.style.opacity = '0'; document.body.appendChild(textarea); textarea.select(); document.execCommand('copy'); textarea.remove(); }
    toast(`${label} copied`);
  }
  function downloadSvg(svg, name, style) {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}-${style}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    toast('SVG downloaded');
  }
  function filtered() {
    const q = state.query.trim().toLowerCase();
    const list = icons.filter((item) => {
      if (state.style !== 'all' && !item.variants[state.style]) return false;
      if (!q) return true;
      return item.name.toLowerCase().includes(q) || styles.some((style) => item.variants[style] && `${style}/${item.name}`.toLowerCase().includes(q));
    });
    list.sort((a, b) => state.sort === 'za' ? b.name.localeCompare(a.name) : state.sort === 'variant-count' ? Object.keys(b.variants).length - Object.keys(a.variants).length || a.name.localeCompare(b.name) : a.name.localeCompare(b.name));
    return list;
  }
  function card(item) {
    const style = preferredStyle(item); const svg = item.variants[style] || '';
    return `<button class="icon-card card" type="button" data-name="${escapeHtml(item.name)}" title="${escapeHtml(item.name)}">` +
      `<span class="icon-preview">${svg}</span><span class="icon-name">${escapeHtml(item.name)}</span><span class="icon-style">${ui.tag}${style}</span></button>`;
  }
  function gridMetrics() {
    const width = Math.max(els.grid.clientWidth, 1);
    const columns = Math.max(1, getComputedStyle(els.grid).gridTemplateColumns.split(' ').filter(Boolean).length || Math.floor((width + 10) / 126));
    return { columns, rowHeight: 130 };
  }
  function scheduleVirtualRender() {
    if (state.virtualRaf) return;
    state.virtualRaf = requestAnimationFrame(() => { state.virtualRaf = 0; renderVirtualGrid(); });
  }
  function renderVirtualGrid() {
    const list = state.filteredIcons;
    els.empty.classList.toggle('show', list.length === 0);
    if (!list.length) { els.grid.innerHTML = ''; return; }

    const { columns, rowHeight } = gridMetrics();
    const totalRows = Math.ceil(list.length / columns);
    const gridTop = els.grid.getBoundingClientRect().top + window.scrollY;
    const viewportTop = window.scrollY;
    const viewportBottom = viewportTop + window.innerHeight;
    const bufferRows = 4;
    const rawStartRow = Math.floor((viewportTop - gridTop) / rowHeight) - bufferRows;
    let startRow = Math.max(0, rawStartRow);
    let endRow = Math.min(totalRows, Math.ceil((viewportBottom - gridTop) / rowHeight) + bufferRows);
    if (startRow >= totalRows) {
      startRow = Math.max(0, totalRows - bufferRows * 2);
      endRow = totalRows;
    }
    if (endRow <= startRow) endRow = Math.min(totalRows, startRow + bufferRows * 2);
    const startIndex = startRow * columns;
    const endIndex = Math.min(list.length, endRow * columns);
    const topHeight = startRow * rowHeight;
    const bottomHeight = Math.max(0, (totalRows - endRow) * rowHeight);
    const topSpacer = topHeight > 0 ? `<div class="virtual-spacer" style="height:${topHeight}px"></div>` : '';
    const bottomSpacer = bottomHeight > 0 ? `<div class="virtual-spacer" style="height:${bottomHeight}px"></div>` : '';
    const visible = list.slice(startIndex, endIndex).map(card).join('');
    els.grid.innerHTML = `${topSpacer}${visible}${bottomSpacer}`;
  }
  function render() { state.filteredIcons = filtered(); renderVirtualGrid(); }
  function setSelectedStyle(style) {
    const item = state.selected; if (!item?.variants[style]) return; state.selectedStyle = style;
    els.variantTabs.querySelectorAll('.variant-tab').forEach((button) => button.classList.toggle('active', button.dataset.variant === style));
    const svg = item.variants[style]; els.dialogIconMini.innerHTML = svg; els.dialogPreview.innerHTML = svg; els.quickCopyActions.innerHTML = `<button class="quick-copy-action" type="button" data-copy="download" aria-label="Download SVG" title="Download SVG">${ui.download}</button><button class="quick-copy-action" type="button" data-copy="src" aria-label="Copy @iconsax token" title="Copy @iconsax token">${ui.copy}</button><button class="quick-copy-action" type="button" data-copy="tui" aria-label="Copy tui-svg element" title="Copy tui-svg element">${ui.code}</button>`;
    els.sizePreview.innerHTML = [
      ['xs', '16px'],
      ['s', '20px'],
      ['m', '24px'],
      ['l', '32px'],
      ['xl', '48px'],
    ].map(([size, label]) => `<div class="size-preview-card"><span class="size-preview-icon" data-size="${size}">${svg}</span><strong>${label}</strong><small>${size.toUpperCase()}</small></div>`).join('') +
      [
        ['xs', 'XS'],
        ['s', 'Small'],
        ['m', 'Medium'],
        ['l', 'Large'],
      ].map(([size, label]) => `<button class="tui-preview-button tui-preview-button-size" data-appearance="secondary-action-button" data-size="${size}" type="button"><span class="preview-button-icon">${svg}</span>${label}</button>`).join('');
    els.buttonPreview.innerHTML = [
      ['primary-action-button', 'Primary'],
      ['secondary-action-button', 'Secondary'],
      ['primary-button-outlined', 'Outlined'],
      ['success-action-button', 'Success'],
      ['negative-action-button', 'Negative'],
    ].map(([appearance, label]) => `<button class="tui-preview-button" data-appearance="${appearance}" type="button"><span class="preview-button-icon">${svg}</span>${label}</button>`).join('') +
      [
        ['primary-icon-button', 'Primary icon'],
        ['secondary-icon-button', 'Secondary icon'],
        ['positive-icon-button', 'Positive icon'],
        ['negative-icon-button', 'Negative icon'],
        ['basic-icon-button', 'Basic icon'],
      ].map(([appearance, label]) => `<button class="tui-preview-icon-button" data-appearance="${appearance}" type="button" aria-label="${label}" title="${label}">${svg}</button>`).join('');
    els.chipPreview.innerHTML = [
      ['default', 'Default'],
      ['success', 'Success'],
      ['warning', 'Warning'],
      ['error', 'Error'],
      ['info', 'Info'],
      ['disabled', 'Disabled'],
    ].map(([status, label]) => `<span class="tui-preview-chip" data-status="${status}">${svg}${label}</span>`).join('');
  }
  function openIconDialog(item) {
    state.selected = item; const style = preferredStyle(item); state.selectedStyle = style;
    els.iconDialogTitle.textContent = item.name; els.iconDialogSubtitle.textContent = `${Object.keys(item.variants).length} available variant${Object.keys(item.variants).length === 1 ? '' : 's'}`;
    els.variantTabs.innerHTML = styles.filter((style) => item.variants[style]).map((style) => `<button class="variant-tab ${style === state.selectedStyle ? 'active' : ''}" type="button" data-variant="${style}">${ui.check}${style}</button>`).join('');
    setSelectedStyle(style); els.iconDialog.showModal();
  }
  els.grid.addEventListener('click', (event) => { const card = event.target.closest('.icon-card'); if (!card) return; const item = iconByName.get(card.dataset.name); if (item) openIconDialog(item); });
  els.variantTabs.addEventListener('click', (event) => { const button = event.target.closest('[data-variant]'); if (button) setSelectedStyle(button.dataset.variant); });
  els.iconDialog.addEventListener('click', (event) => {
    const copy = event.target.closest('[data-copy]'); if (!copy || !state.selected) return;
    const item = state.selected; const style = state.selectedStyle; const svg = item.variants[style];
    if (copy.dataset.copy === 'download') return downloadSvg(svg, item.name, style);
    if (copy.dataset.copy === 'src') return copyText(srcFor(item.name, style), 'Iconsax token');
    if (copy.dataset.copy === 'tui') return copyText(snippetFor(item.name, style), 'tui-svg element');
  });
  document.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
  document.querySelectorAll('dialog').forEach((dialog) => dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); }));
  document.querySelectorAll('.seg').forEach((button) => button.addEventListener('click', () => { state.style = button.dataset.style; document.querySelectorAll('.seg').forEach((seg) => seg.setAttribute('aria-pressed', String(seg === button))); render(); }));
  els.search.addEventListener('input', () => { state.query = els.search.value; render(); });
  els.sort.addEventListener('change', () => { state.sort = els.sort.value; render(); });
  window.addEventListener('scroll', scheduleVirtualRender, { passive: true });
  window.addEventListener('resize', scheduleVirtualRender);
  document.addEventListener('keydown', (event) => { if (event.key === '/' && document.activeElement !== els.search && !document.querySelector('dialog[open]')) { event.preventDefault(); els.search.focus(); } });
  els.themeToggle.addEventListener('click', () => { const next = document.documentElement.dataset.theme === 'night' ? 'day' : 'night'; applyTheme(next, true); });
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', () => { if (!readStoredTheme()) applyTheme(getSystemTheme()); });
  els.docsButton.addEventListener('click', () => els.docsDialog.showModal());
  els.copyInterceptor.addEventListener('click', () => copyText(els.interceptorCode.textContent, 'Interceptor'));
  render();
  page?.setAttribute('aria-busy', 'false');
  loadingOverlay?.classList.add('is-hidden');
})().catch((error) => {
  document.body.innerHTML = `<main class="page"><section class="card" style="padding:24px"><h1>Unable to load Iconsax data</h1><p>${error.message}</p><p>Serve this folder over a local web server if your browser blocks JSON loading from file:// URLs.</p></section></main>`;
  console.error(error);
});

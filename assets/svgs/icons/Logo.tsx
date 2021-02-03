import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function Logo(props: SvgProps | any) {
    return (
        <Svg
            width={189}
            height={165}
            viewBox="0 0 189 165"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M22.214 126.234l-6.902.696.29-5.51c.116-1.914.812-3.538 2.088-4.814 1.16-1.16 2.552-1.74 4.176-1.74h.406c.58 0 1.044-.174 1.508-.58.464-.406.696-.928.754-1.566v-.174c0-.522-.232-.986-.58-1.45a2.749 2.749 0 00-1.566-.696h-.58c-1.276 0-2.436.232-3.596.638-1.392.58-2.552 1.334-3.596 2.378a10.63 10.63 0 00-2.494 3.538c-.58 1.392-.928 2.784-.986 4.234l-.348 6.206-7.54.812c-.696.116-1.218.348-1.566.812a2.23 2.23 0 00-.464 1.392v.29c.058.58.29 1.102.754 1.45.406.406.928.58 1.508.58h.058s.058-.058.174-.058l6.902-.696-.928 18.502v.174c0 .58.174 1.044.58 1.392.348.464.87.754 1.566.754h.058c.58 0 1.102-.174 1.566-.58.406-.406.638-.928.696-1.566l.928-19.198 7.598-.812c.58-.058 1.102-.348 1.566-.812.29-.348.464-.812.464-1.334v-.29c-.116-.58-.348-1.102-.812-1.508-.464-.29-.928-.464-1.392-.464h-.29zm14.631 21.75l2.378-18.56 4.582-.522h.464c.812 0 1.624.29 2.378.812.812.696 1.334 1.508 1.45 2.552.058.58.29 1.102.754 1.45.406.406.87.58 1.45.58.116 0 .174 0 .232-.058a2.307 2.307 0 001.566-.812c.29-.348.464-.812.464-1.334v-.29c-.348-2.32-1.392-4.176-3.132-5.626-1.508-1.16-3.248-1.798-5.162-1.798-.348 0-.638.058-.986.058l-3.48.406.232-1.972v-.348c0-.464-.174-.928-.406-1.392-.406-.464-.928-.696-1.566-.812h-.29c-.522 0-.986.174-1.334.464-.522.406-.812.928-.87 1.508l-.58 4.814v.058l-2.61 20.3v.29c0 .522.116.986.464 1.334.348.522.87.812 1.508.87h.29c.522 0 .986-.174 1.45-.522.406-.348.638-.87.754-1.45zm40.58-29.986h-.29c-.522 0-.986.174-1.334.464-.464.464-.754.986-.812 1.566v.29c0 .58.174.986.522 1.334.348.464.87.754 1.508.812.812.116 1.624.348 2.32.754a6.844 6.844 0 011.856 1.566c.464.696.87 1.392 1.16 2.204.174.754.29 1.508.29 2.32v.348c-2.262-2.204-5.046-3.48-8.294-3.828-.232 0-.406-.058-.58-.058h-.638c-1.624 0-3.19.29-4.698.812-1.508.58-2.842 1.334-4.06 2.378-1.276 1.044-2.204 2.262-2.9 3.654-.696 1.392-1.16 2.9-1.276 4.466-.058.406-.058.754-.058 1.102 0 1.334.174 2.61.638 3.77a11.442 11.442 0 002.494 4.292 12.728 12.728 0 003.944 3.074 12.98 12.98 0 004.93 1.334c.174 0 .348.058.58.058h.638c1.392 0 2.726-.174 4.002-.58a13.38 13.38 0 003.654-1.798l-.116 1.102v.29c0 .522.174.986.522 1.334.348.464.87.754 1.508.812h.232c.522 0 .986-.174 1.45-.58.406-.348.638-.87.754-1.508l.928-10.382.812-9.164c0-.29.058-.58.058-.928 0-1.218-.174-2.378-.522-3.538a12.438 12.438 0 00-2.03-3.77 10.848 10.848 0 00-3.132-2.726c-1.276-.696-2.61-1.16-4.06-1.276zm-4.06 28.188h-.812c-1.218-.116-2.32-.406-3.306-.928-1.044-.464-1.914-1.102-2.61-1.914-.696-.812-1.218-1.682-1.566-2.726-.348-.754-.464-1.566-.464-2.378 0-.232 0-.464.058-.754a6.727 6.727 0 01.812-2.842c.464-.87 1.102-1.624 1.856-2.32a8.316 8.316 0 012.61-1.508c.986-.348 2.03-.58 3.19-.58h.406c.116 0 .232.058.406.058 2.32.232 4.292 1.16 5.916 2.9.696.812 1.276 1.74 1.624 2.726.232.812.348 1.682.348 2.494v.58c-.116 1.044-.406 2.03-.87 2.9a7.754 7.754 0 01-1.856 2.262 8.316 8.316 0 01-2.61 1.508 9.341 9.341 0 01-3.132.522zm45.522-1.16c1.102-1.392 1.914-3.016 2.436-4.814.348-1.276.58-2.668.58-4.118 0-.406-.058-.87-.058-1.334-.348-3.712-1.74-6.902-4.176-9.454a14.263 14.263 0 00-4.176-2.9 11.873 11.873 0 00-4.872-1.044c-.232 0-.406.058-.522.058h-.406c-1.624.116-3.19.58-4.582 1.276-1.392.696-2.668 1.682-3.77 2.9l-.116-1.566a2.496 2.496 0 00-.754-1.566c-.406-.29-.87-.464-1.334-.464h-.29c-.696.058-1.218.29-1.566.754-.348.406-.522.87-.522 1.334v.29l.928 12.354 1.45 19.14c.058.638.29 1.16.754 1.508.406.406.928.58 1.508.58h.174c.58-.058 1.102-.348 1.566-.812.348-.348.522-.87.522-1.45v-.174l-.638-8.352c1.102.928 2.32 1.682 3.712 2.146 1.334.522 2.726.754 4.234.754.348 0 .638 0 .87-.058 1.74-.116 3.422-.58 4.988-1.45 1.566-.87 2.9-2.03 4.06-3.538zm-3.596-2.726a8.965 8.965 0 01-2.61 2.32c-.986.58-2.03.87-3.132.928-.174.058-.348.058-.58.058a7.784 7.784 0 01-3.248-.696c-1.044-.464-1.914-1.16-2.726-1.972s-1.45-1.798-1.914-2.958c-.522-1.102-.812-2.32-.928-3.596v-.754c0-1.044.116-2.088.406-3.132.348-1.218.87-2.32 1.682-3.364 1.508-1.972 3.422-3.016 5.8-3.248h.58c1.102 0 2.146.232 3.19.696 1.044.464 1.914 1.16 2.726 1.972.754.812 1.392 1.798 1.914 2.9.464 1.16.812 2.32.928 3.596v.754c0 1.102-.174 2.146-.406 3.132a9.658 9.658 0 01-1.682 3.364zm38.326 2.726c1.102-1.392 1.914-3.016 2.436-4.814.348-1.276.58-2.668.58-4.118 0-.406-.058-.87-.058-1.334-.348-3.712-1.74-6.902-4.176-9.454a14.263 14.263 0 00-4.176-2.9 11.873 11.873 0 00-4.872-1.044c-.232 0-.406.058-.522.058h-.406c-1.624.116-3.19.58-4.582 1.276-1.392.696-2.668 1.682-3.77 2.9l-.116-1.566a2.496 2.496 0 00-.754-1.566c-.406-.29-.87-.464-1.334-.464h-.29c-.696.058-1.218.29-1.566.754-.348.406-.522.87-.522 1.334v.29l.928 12.354 1.45 19.14c.058.638.29 1.16.754 1.508.406.406.928.58 1.508.58h.174c.58-.058 1.102-.348 1.566-.812.348-.348.522-.87.522-1.45v-.174l-.638-8.352c1.102.928 2.32 1.682 3.712 2.146 1.334.522 2.726.754 4.234.754.348 0 .638 0 .87-.058 1.74-.116 3.422-.58 4.988-1.45 1.566-.87 2.9-2.03 4.06-3.538zm-3.596-2.726a8.965 8.965 0 01-2.61 2.32c-.986.58-2.03.87-3.132.928-.174.058-.348.058-.58.058a7.784 7.784 0 01-3.248-.696c-1.044-.464-1.914-1.16-2.726-1.972s-1.45-1.798-1.914-2.958c-.522-1.102-.812-2.32-.928-3.596v-.754c0-1.044.116-2.088.406-3.132.348-1.218.87-2.32 1.682-3.364 1.508-1.972 3.422-3.016 5.8-3.248h.58c1.102 0 2.146.232 3.19.696 1.044.464 1.914 1.16 2.726 1.972.754.812 1.392 1.798 1.914 2.9.464 1.16.812 2.32.928 3.596v.754c0 1.102-.174 2.146-.406 3.132a9.658 9.658 0 01-1.682 3.364zm34.265-20.938h-.174c-.58 0-1.044.174-1.392.522-.464.464-.754.986-.812 1.566l-.812 14.79v.812c-.116.928-.29 1.856-.638 2.668a6.256 6.256 0 01-1.508 2.146c-.696.58-1.392 1.044-2.088 1.334a5.568 5.568 0 01-1.914.348h-.986c-.87 0-1.682-.232-2.378-.638a5.727 5.727 0 01-1.914-1.624 5.985 5.985 0 01-1.16-2.262 6.067 6.067 0 01-.348-2.088v-.58l.812-15.602v-.29c0-.464-.174-.928-.522-1.334a2.496 2.496 0 00-1.566-.754h-.174c-.58 0-1.044.174-1.45.522-.464.464-.754.986-.754 1.624l-.87 15.602v.638c0 1.334.174 2.61.638 3.77.464 1.45 1.102 2.726 2.03 3.77a10.308 10.308 0 003.306 2.61c1.276.696 2.61 1.044 4.118 1.102l.522.058h.522c2.03 0 3.944-.58 5.8-1.798l-.29 5.568c-.116 1.972-.87 3.538-2.204 4.756-1.16 1.16-2.552 1.74-4.118 1.74h-.464c-.58 0-1.102.174-1.45.522-.464.464-.754.986-.754 1.566v.174c0 .58.174 1.102.58 1.45.348.464.87.754 1.566.754h.522c2.784 0 5.162-.986 7.25-2.958 1.044-.986 1.856-2.146 2.494-3.538a12.97 12.97 0 001.044-4.234l.29-5.046.522-9.744.87-15.602v-.174c0-.522-.232-.986-.58-1.45a2.749 2.749 0 00-1.566-.696z"
                fill="#7A869A"
            />
            <Path
                d="M73.258 83.44v13.046h-9.544c-.762 0-1.61-.61-1.61-1.34 0-.101.019-.196.046-.296l3.984-12.514 7.124 1.105zM123.37 96.478h-18.98l7.11-7.108.012-.013 3.307.528.279.046.624.1.313.046 7.773 1.245 1.115 3.524c.279.855-.697 1.632-1.553 1.632zM123.032 88.878l-9.555-1.48 6.893-6.892 2.662 8.372z"
                fill="#00B180"
            />
            <Path
                d="M73.258 83.44v13.046h-9.544c-.762 0-1.61-.61-1.61-1.34 0-.101.019-.196.046-.296l3.984-12.514 7.124 1.105zM87.122 83.306L66.83 80.16l1.857-5.84c.27-.846.697-1.63 1.559-1.63h10.847l6.03 10.618zM98.433 87.343l10.784 1.672-7.47 7.463h-26.62v-12.75l13.415 2.082 3.356 5.906a2.311 2.311 0 003.15.909c.374-.206.691-.525.9-.91l2.485-4.372zM119.73 78.5l-8.544 8.544-11.566-1.8 7.134-12.554h10.088c.857 0 1.289.783 1.561 1.63l1.327 4.18zM123.032 88.878l-9.555-1.48 6.893-6.892 2.662 8.372zM123.37 96.478h-18.98l7.11-7.108.012-.013 3.307.528.279.046.624.1.313.046 7.773 1.245 1.115 3.524c.279.855-.697 1.632-1.553 1.632z"
                fill="#00B180"
            />
            <Path
                d="M111.512 89.359l3.307.528-3.32-.518.013-.01z"
                fill="#00B180"
            />
            <Path
                d="M116.463 43.849c0 2.232-.239 4.149-.7 5.935 0 .02-.007.034-.014.046-.554 2.141-1.434 4.082-2.6 6.14l-2.031 3.58L95.413 87.21c-.151.288-.39.521-.673.68a1.74 1.74 0 01-2.36-.68l-17.738-31.24a27.635 27.635 0 01-1.31-2.56l-.063-.123c-.267-.598-.5-1.194-.708-1.8l-5.564-6.811-9.723-14.429c2.121-2.423 5.284-2.03 8.228 3.236l5.193 7.2-2.607-11.495L65.276 7.83c3.684-1.511 6.971.664 7.321 8.128l2.106 12.77.44 1.132 2.957-9.702L85.704 0c3.958.404 5.824 3.877 2.62 10.622l-3.602 11.987a22.568 22.568 0 0115.994-.789h.013c.303.095.598.197.892.31.021 0 .034.006.048.021A4.256 4.256 0 01104.084 26c0 1.58-.85 2.95-2.114 3.691h-.007a5.675 5.675 0 01-2.058.366 6.795 6.795 0 01-1.99-.303c-.109-.034-.22-.07-.33-.097a14.39 14.39 0 00-5.887-.362 14.221 14.221 0 00-8.713 4.798c-.075.08-.143.17-.22.258a14.208 14.208 0 00-3.094 7.118 12.252 12.252 0 00-.125 1.584 13.31 13.31 0 00.05 1.53c.115 1.344.418 2.656.906 3.896a14.013 14.013 0 001.563 2.971v.007a13.626 13.626 0 001.662 1.988c.007.01.014.017.02.024a14.244 14.244 0 009.4 4.116c3.534.16 6.999-1.01 9.724-3.273a14.265 14.265 0 004.994-8.968 14.28 14.28 0 00-.508-6.214c-.693-2.217-.268-4.833 1.647-6.143.048-.034.097-.066.151-.094 1.907-1.188 4.453-.673 5.359 1.397.199.449.379.906.54 1.368.077.104.14.213.199.322a25.317 25.317 0 011.202 7.188v.04c.008.217.008.43.008.642z"
                fill="#F53838"
            />
            <Path
                d="M103.9 40.485c-.646-.653-1.722-1.047-2.603-.764-.68.22-1.296.914-1.231 1.578.012.13.195.126.255.037.409-.596.948-1.008 1.691-.862-.125 1.326-.955 4.94-6.135 6.82-4.808 1.745-9.19-1.998-10.17-3.412.644-.536 1.222-.46 2.038-.412.117.007.148-.152.06-.21-.89-.583-2.124-.392-2.925.264-.75.615-1.48 1.998-.727 2.86.057.065.223.066.23-.027.057-.773.067-1.32.708-1.95.002-.001.01 0 .012.003.692 1.731 4.078 7.955 11.878 5.452 6.179-1.983 5.675-7.631 5.327-9.328.947.226 1.101.724 1.387.824.463.163.659-.414.205-.873z"
                fill="#7A869A"
            />
        </Svg>
    )
}

export default Logo

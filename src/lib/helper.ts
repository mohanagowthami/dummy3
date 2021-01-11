export  const getFonts = (width:number):number =>
{
    switch (true)
    {
        case width <= 425:
            return width
        case width > 425 && width <= 576:
            return width
        case width > 576 && width <= 768:
            return width
        case width > 768 && width <= 1024:
            return width
        default:
            return width
    }
}
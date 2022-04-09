import React from 'react';
import { Modal, Button } from 'react-bootstrap'
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
// import {Icon} from 'leaflet'
import StaticMap from  './LeafLetModal'

export default function ModalMap(props) {
    // const position = [51.505, -0.09]
    // console.log(props.data)    
    // const icon = new Icon({
    //     iconUrl:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAADpCAMAAABx2AnXAAAA8FBMVEX///8zgczOzs4REiTPz8/MzMzNzc3Q0NDLy8vR0dH8/Pzo6Ojk5OTp6ekAAAD39/fw8PDa2tsAAAvf39+wsLElfMsAABoAABcygcsAABjU0s4LDCAceckpfcoAABMREiPg6vTL3e7CwsONjZV5eYFtbnYnKDeIiJBTkdC1zue/x9Dq8fdBiM2xv86CpcydveGHsNxum82PrM2tyOads81KSlScnKAAAB86OkZgYWsdHSxTU15+qtphlMzF0t19q9vF1u25xNFyncyUt9+Xs9Glt81lnNSop61OT1dAQE5MTFa1trcbGixlZm1zc3klJTPGOqhfAAAR5ElEQVR4nO2dCV/iyBLAYxMCQQFxJog5EIdTBG9ZQN0ZHY911uP7f5uXBEi6m75ygr6t/e1btV4n9U91d7oqlY4kwbIpq5AUYFURVgG0Fcj5grZCVArSqjhXyY5grRTZl6xEVWGtsgASCW2WPpgMviYY2cT/wNYVjGbiZwejmigGBtYVbDZvfD0wRqcSAgMgt5ZgrNEiAgaCgBU/Dxj4omDgi4KBoGD0kyGqPNYKOiDWCj4ZZmJW8QUzMQ+p0HPNVNmZyFirLCTSZsyyJazagiUGFaLZkiA/yGALuToqrNpEVHnIEQrSqqDCPtoitZo5Am0lwz7CWlFVBRlyEdZKggeVjJkIq1CwLDR08FaQCrtSyuz/7wp+OaCLiKqkLFXFuojJgskEsPl646uBUU38D2wdwWR9JrnQYNl1AXNalRsHhyenNzdPT7e3t2f3xw/Du7yuo9OsIBhYCzDV9s3fFz97Ncs0NcsXTbNqvbOHv4OD4davAsym6j/cag7RhrVBEMu0ng6PAoEtWZ8+mE113rM9QyKC2cyniyNRMIL1sYBhJ2OBqfrjbY1H5fvtQAiMZH1osJwQGLq8KOjgYeB0QFGxzMFFQVIBFSzv/k1RCGA5RQxM3SpAUq5QVQVqK6l8XtOEoeZio6k69VxwvJRDLVSpqoKE/FJEDEZVkPtUGW4mbfoq/XIQGMsRbXAoSf4B0dgPORca+1FVOdR9cDSJhYxFuBkWWS1U+jAcluu1XsM/ID32g6NJPIoLGUHzwFRduTfDYm04Y+20TALDw1PI+HTA9Mfw7pqJNjhYPzBVv4+I5Yh5ugxG74ppgOn9nlaLDmaPtCMMDKwQrAj0YU38xsUUrXaApXtXCaY/xNAN52KZh2i6d4Vg28fxcdlinmzD6V5xsHzcYKexctlkxzq0PFydx06j3L2Iot3rawD2O3Yum8z22cLCeMDoj9WQZDV0spMEuFwyLxGKgsF57AAp7mLAhHbxIhEue5xdeqZsiWa1ERUjxY2EcXiM5P5R1h8T4rLJDrxzUfPYhZynUAKluKFRBUiBptqPY7VBkdoiIQLP4nFF0GwwVe/FtN4gidVbGVgs6166zFfE6YPpj4lyecMsdTBlkCzXhjUorwJMv09wgM1EO10BmDpMuCM6YjbSB9OT7oiOuDNjDGA58YeugUKw2ZOIjVrN/SlID7aDs3Q9pgBxh1lm7enkV+OoXMjn+8PLY9H0tyuDQhxg+JJKpoLp56IOM63Tg8UaIiu7j2Hyj2eWcPMLJphgilv82WRWcC2l1S7Kfqt57GDDZYUT4YMCHFYwHtViq1lUilBNRTZHV+mHQotfrfaQ0xV76ToX5IAnYvkf7RxptZWHBNBV6LnQaJIRaIpNiebPo21GoVL/zBTxew1pxcx5QJUuaN2WKJgdrfBNsrRDZgXWJhCbWf34JQWwW34vsgYNiQ2myPrdQOBAZ6mBqX3+dbZ67qTBBpP1vADZxhHcKkkw/ZxrzZyLBybnBMjsGT8tj3HjS2swv8o8MDnX585D1lNKYGrf4k0d7uJVCMweZ9wZRIP6YqJglzxTnBWeKJisP/Duif7hkgXjzonajd+KCwaAfsarB7mBWiUJxhthNb/rcMEc+7iTrJUKmHrH6TraCdSKA+bapx9zLpU3ZMODwc/kKSnuHG+9UKOdbKke28t2ciYj6xBqBWVPZeyAyFoRTRIXIdkkq7Zv2NfXOocbwgcsohlpSHHCOeQN+YCb31whp7ghzwrWY3PuYlYe+D6i12Mj4VOZ07sHukJMcQPYR1jYAg0qvCqKHEEX2P3GOtP9UUWqiiKqOL2gll2+vhK7qD04WINtg/YoBoaa+Ivjsjty9VusYAdsG2p9VQQMM/GI0w2GKYCxg2frFnIYHWwpRcEeuNZlCmAnzNneOhUBWzJRYt/KrHM9ebDfTBPMQwGwZRMl9vrTuk8BjD2BaQeMIti8z4WbOGR77GzlYFaD6zGiiXfso96mAMZei1tHPI+R70j9Tw9GWMo458pzwNTAYJAZS1UDRNUTD4y6RrPBgLfcCgimu41AyBfjRKq4eR5rhKn9Lpe5XdFrVYYEfVSEqFBKXjxmu44T71p3wu/HwpGVyl6o+TH0Fv2V1S3BQBN/q3a+mQPnCa01RA8oWI+tH3Bu+14r+BECXnIkBrbksZl1nHBXewgDBtQLJpj2m2h9TKmBORj7yZh1TwVj1LEp+il7PePlTOMHW4wWlV3dYfVor4UzC/TUHuugG+avBD22AGMvfuz5ngwGWGAyJ1GlNZIHy3FsgLObEBhggukPnDyVd7WSA5M5D/2QTPui1cx8BhgnBzsgWx8zGCeZYx4ttQIcMLnPzuhBFytJME5605+aF60AD4xXvWT5h0wS7JKXui+jrQAPTGYvFO0j/koDTO7zUty/kVaAC8YtNzP9SxUWDLm3oGBeM27JgNWAWmVpJQpeRlphB5kb8NyB5rFBgXhAXoq7SFFts1cJzk2akuL+Bouv4j0gtY63CK0YB3SEneKWieETJ7PoVs0vt5Jo9djcyn3tUfH8jqe4s1myihdBewsimLnMLfIw5+lg8g4srngq7mXaqPmDR3zfFiYYtDJHnMnJtDty55BRtpZBwBrcQ1lnelpg/Iu8UXPIBMAaAiU+j3JaYAWBUiqbjLYZEATWIO+wgB4pS7M+djDpt0ARlPWoc8F+CdTlWMd6emBHIlV92jHQ2WBCb2iZfZAemCRQJWaT9YaM3aw2Gz0RLutJp1qfAJhIXZ9T5HyDhJ0emL3i7N+LVQabjWyaYIqQy5xC55+NJTBZl4dnggXP2hNzJ7HYwcCjaCG2Zd5eNOZrurzsbM6iDM97wnXc5kFYMMj4IC/GBXjDytK0wdPJ4UHj6G74eHl8OxAu4Z6FmIwX44RT3JvUbUCwZHVO5RetoXCmLZrm7HYUpJ3ZCL1RCSJObEJ5tbOIXDiJ99QlHrFu9fwPxEKkVFthhS0oGH3v3iKehW8k9nqmL+YdwAqVtniBpvdWLQYmC4NJPxN3mbv8Je2ISQWDXhdGwQS3+nSbNRJ/z8qyHRYILEsDY2yYugwmEr1E43LjlQBg2ZjAkh5lmuOwVYBJN4l2xnmAuQowoUV+aNFmy/pVgEk/E3SZdT9b1q8EjFPiFw1sHoetBCzBUbZw2IrAjpIDWwTO8YDBOvyNP2ytOBNeVjg015nOToxzU9xolnjbzxFvF+mqbe/PakIuMxuL821XKhQz2CluOwrzXk0V35ZxEeQrCb2Yr51C54K7SoAUNzR0Quzdm2PXCoUV+BE9J4ImM6MRdJhNiRNxGewwNhjNmZHBgJyEy5CaipDbwkcDc59Hxj5/II+xVwLmJtM4j/xDiIlmI9MHWzxCjpkMddgKwBa3gkrMmzjVKisF81OORZGHL+JiHWMZ/3TB4FzqUbBkIU/62GIgVTA0Scx+eyKYWMf4w6dwYAA1EQFjpLihk9mrrUKMfVHDF0eMJZXCeDEOzWPDddBYFTesweqxy4X4Rpl2rGNmMCxkqFBKJNrBU9xwj8BaZQW2VRCUWpm55QgSm6ApbtZGJWKBJqEqivvGr6iYJ/j1XUpx+/0SYGBQnw0TQQMCmJyP6V7mvhwu9pJxNpsCmO2yWEbZ7OVwJlg2ITB3jiQV6MXSF63CqsAADSwWl5knUniwSFkqQAWT89G53Clx3cDimBgX2y+kDuatQ0hgMUyMg/JqwAATLPoo8/bLSBkMcMAAiOox38S4wViPailbVkNgAts6sYTyylE8HkNS3NRmS+u3xd8jjbJawT+g4FqRrlpKccMipKpUKr4qws7cNe3BPVgFOaAjFVi+wZoiXbWNxGP0FDfzE5B+JF+OsLHpwOsShHiMHHQxNyqBBhU9gmYXwUIpivAu0869usTli5glM0dNDSw7EyuphBShR1nNf0VaPIJOGAxWhXWZ9kCrQU8OjDD86GCcHXXoDlPoWwglA0acVxjfqg3nMu0BqqlcT7BwE+MAqtROBYxyJ2CASWG+umNe0Eu11wWsoIYYZQP7npkmGPXezQIL8aEk81BifQ96TcBUENhlA/aHrsOBAbqJcPfAwaiqQk4O6jLbYSwT89R1E3NJhawjsRQ3JHhuma6y/xBsYrR6zHQ6K4/NaIVSwuU3WJ61KBhKOIlxsZ26F6JdKqwAhFHFnaWrqClugL9Vu8kPNF1xWwVy2UDGnxNsZuEyB8x6qM8y8oo0MBANLIjLtEt9CYxuoiAYzWMgIpgkshP1wmHOvTlmMFpXBJHBxF2mXcqxg9HGGIgOxtsP1BOr564S4wBbtKJOHiAOMFGXzRwmDiaQpaKB4SYGBFvktgRdNl/WxwhGm+6Xrn1IMN6upHOHPcrZWMGo97HlThUMzDdRaGIczMOVxMHo216IgUEmirhMe4wXjL7yiAiGmMgfZfMpMQ0weLUF6CrGWtFfv/F3JNAeF62E14rouVCwH4iF3+BsNZbHRhb+9LQzTcXeHcxxWMADBlFB8RihUoke/MHxGFKsNqusdoT7qTzoiywFAHejWOIxGVrP4yEjNKpEM8FwLMx5pdj77KLEjoUjpgaWrY8Oxv58KPwJnchgVI8RrBcGw0vGxVyG7KUWFYzaFUnWxwDGGmXIN4/sMRYFjDbGyNZHB1NkusvQze+igVEnj+TA6J9uNP+ODYw6K1KsR8CIXxcmtkIyhEXqrsK9Ykxg9OmeaqKgx1hbUWzSlh/aELsjxQ9Gv/ZCYEsJUyynS3aZdQtiAqPeoEE0sOVMMAZGdpk2zMYDRl95KKgdCBhV5S2pGFPwQkVymbOdhfDiKOSSSjDFXQmQ4kZVJJdpd1ir7VApblYrlDLWsGWuImy86t7DWK3gAISV4kbTb2jYgh4xXKBJL2q3VWB5Exr3I06iVVH09FuQ8vQEwBR8k+varBosMliguvskwBSskHFe5RYRzDF+1WCKful9mdYya78I1gcGy68FmKL3j2uaI2bt5MhTRQDLrwmYAnR9+HB8cdigWC8MNlPlSWCs7ZsSA3PYZDwVFRosnxQYa8cGxucQwhXBLrfKJwXG3IoiebB8QmAkE9MEy/8fgDH386CeLE/Mp5OahbuKoq3EU9zouWLPLa+JihWPha1vylNUISMrRivWW7XQoAoSQUPM4l+YYu2lQlVJ8LI3QKD5icAC+fkTgQXrwJ8HLODI/DRgQaeczwIWeC4VBWM90UwBLPhNQgxM/APIyYDR7mNRwQgmpglGtT4qGMnE9QeDNxmX0c1qZt/RVN1N1ACq8ncSW1KpdBXj/QrxTVEQ4+kq6TssP5BV5adWSTuwlBD51Cop80XlP7DPJnMwY/5vBvpvJlOtZgz/N+enqv/rmssMzBgbGaMznf+8P1Pt715f1zvjBcrrlbH/cT3+LGQzsOrbW3W3uVvf3d+rl5qvRr2+Z9RL35+fn99HpXqpZBilUkctlcbdlxTB9sX+uk9UzT02bdanrVazW2o131ujTnPUuhr9U/mnVGoXJ81KrvNSqVz9eKl0XlL1mD0OjMx8NBgG9JvhMDi/OGOjWq0a1f2qYezvG1VvsMzHWL25326/776330ql7l/NTOn9/XrnRf7Wao86Smny/ce49FGsVA0j1Z743plkjGpn/Dq1B0pzMq52qsZH20bpGB9G5uPV+PPyPG61W81M96rbvW52Pkal1rUBg1Unk+6kOWm3Xqr1rjHa2X3r/qnulP6qtEZ//i2N/83v1D+21I90B9hut3X17Bh81W01/zT/PF+3Wq3rUXfn7X3S6o663XY7MypN2qPRxPmn1X6btD4wsIzx3Jo2jU5nZEwnk/Yk05xcV0fvzbzd/SrtH63mv62X/FVlJ1Uw489zp3k1emldd7ut13azO2l3bcjma2vy/t4cXdmcpedJd2z/2GqOupO3buv7+Lm1h4BV29Nqp/tue/y9Pim9daedjvHPqLVXn1z91ZzUd9rNTrv0nvacOK2OP4wX+3pPP4zxdDp9qWZeptPx3ktmnOm8vo47xp/x9dVHZ2+csf96tVefVo3XfQTMGXTGnn3f2rXHX6a664yman3P+btRr9r/qUMDMzWxbdp3/seeFzLuv/MJZfaP+7Mxn1XmU4vX9KuvPL6e/Af22eR/aBhyaSvHtFYAAAAASUVORK5CYII=',
    //     iconSize:[50,50]
    // });
    return (        
            <Modal
                {...props}
                fullscreen={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"                                                
            >
                <Modal.Header closeButton>
                    Frieght Map Details- From: {props.data.origin}, To: {props.data.destn}

                </Modal.Header>
                <Modal.Body> 
                    <StaticMap data={props.data}/>                   
                </Modal.Body>                
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>            
    )
}
var canvasa = document.getElementById("canvasa")
        var contexta = canvasa.getContext("2d")

        var canvasb = document.getElementById("canvasb")
        var contextb = canvasb.getContext("2d")

        var image = new Image()

        window.onload = function(){
            var image_path = document.getElementById('path').innerHTML;
            image.src = image_path
            image.onload = function(){

                contexta.drawImage( image , 0 , 0 , canvasa.width , canvasa.height )
            }
        }

        function greyEffect(){

            var imageData = contexta.getImageData( 0 , 0 , canvasa.width , canvasa.height )
            var pixelData = imageData.data
            for( var i = 0 ; i < canvasb.width * canvasb.height ; i ++ ){

                var r = pixelData[i*4+0]
                var g = pixelData[i*4+1]
                var b = pixelData[i*4+2]

                var grey = r*0.3+g*0.59+b*0.11

                pixelData[i*4+0] = grey
                pixelData[i*4+1] = grey
                pixelData[i*4+2] = grey
            }

            contextb.putImageData( imageData , 0 , 0 , 0 , 0 , canvasb.width , canvasb.height )
        }

        function blackEffect(){

            var imageData = contexta.getImageData( 0 , 0 , canvasa.width , canvasa.height )
            var pixelData = imageData.data
            for( var i = 0 ; i < canvasb.width * canvasb.height ; i ++ ){

                var r = pixelData[i*4+0]
                var g = pixelData[i*4+1]
                var b = pixelData[i*4+2]

                var grey = r*0.3+g*0.59+b*0.11
                if(grey > 125){
                    pv = 255
                }
                else{
                    pv = 0
                }

                pixelData[i*4+0] = pv
                pixelData[i*4+1] = pv
                pixelData[i*4+2] = pv
            }

            contextb.putImageData( imageData , 0 , 0 , 0 , 0 , canvasa.width , canvasa.height )
        }

        function blueEffect(){

            var imageData = contexta.getImageData( 0 , 0 , canvasa.width , canvasa.height )
            var pixelData = imageData.data
            for( var i = 0 ; i < canvasb.width * canvasb.height ; i ++ ){

                var r = pixelData[i*4+0]
                var g = pixelData[i*4+1]
                var b = pixelData[i*4+2]

                r = r*0.1
                g = g*0.1
                b = b

                pixelData[i*4+0] = r
                pixelData[i*4+1] = g
                pixelData[i*4+2] = b
            }

            contextb.putImageData( imageData , 0 , 0 , 0 , 0 , canvasa.width , canvasa.height )
        }

        function reverseEffect(){

            var imageData = contexta.getImageData( 0 , 0 , canvasa.width , canvasa.height )
            var pixelData = imageData.data
            for( var i = 0 ; i < canvasb.width * canvasb.height ; i ++ ){

                var r = pixelData[i*4+0]
                var g = pixelData[i*4+1]
                var b = pixelData[i*4+2]

                pixelData[i*4+0] = 255 - r
                pixelData[i*4+1] = 255 - g
                pixelData[i*4+2] = 255 - b
            }

            contextb.putImageData( imageData , 0 , 0 , 0 , 0 , canvasb.width , canvasb.height )
        }

        function blurEffect(){

            var tmpImageData = contexta.getImageData( 0 , 0 , canvasa.width , canvasa.height )
            var tmpPixelData = tmpImageData.data

            var imageData = contexta.getImageData( 0 , 0 , canvasa.width , canvasa.height )
            var pixelData = imageData.data

            var blurR = 3
            var totalnum = (2*blurR + 1)*(2*blurR + 1)

            for( var i = blurR ; i < canvasb.height - blurR ; i ++ )
                for( var j = blurR ; j < canvasb.width - blurR ; j ++ ){

                    var totalr = 0 , totalg = 0 , totalb = 0
                    for( var dx = -blurR ; dx <= blurR ; dx ++ )
                        for( var dy = -blurR ; dy <= blurR ; dy ++ ){

                            var x = i + dx
                            var y = j + dy

                            var p = x*canvasb.width + y
                            totalr += tmpPixelData[p*4+0]
                            totalg += tmpPixelData[p*4+1]
                            totalb += tmpPixelData[p*4+2]
                        }

                    var p = i*canvasb.width + j
                    pixelData[p*4+0] = totalr / totalnum
                    pixelData[p*4+1] = totalg / totalnum
                    pixelData[p*4+2] = totalb / totalnum
                }

            contextb.putImageData( imageData , 0 , 0 , 0 , 0 , canvasb.width , canvasb.height )
        }

        function mosaicEffect(){

            var tmpImageData = contexta.getImageData( 0 , 0 , canvasa.width , canvasa.height )
            var tmpPixelData = tmpImageData.data

            var imageData = contexta.getImageData( 0 , 0 , canvasa.width , canvasa.height )
            var pixelData = imageData.data

            var size = 16
            var totalnum = size*size
            for( var i = 0 ; i < canvasb.height ; i += size )
                for( var j = 0 ; j < canvasb.width ; j += size ){

                    var totalr = 0 , totalg = 0 , totalb = 0
                    for( var dx = 0 ; dx < size ; dx ++ )
                        for( var dy = 0 ; dy < size ; dy ++ ){

                            var x = i + dx
                            var y = j + dy

                            var p = x*canvasb.width + y
                            totalr += tmpPixelData[p*4+0]
                            totalg += tmpPixelData[p*4+1]
                            totalb += tmpPixelData[p*4+2]
                        }

                    var p = i*canvasb.width+j
                    var resr = totalr / totalnum
                    var resg = totalg / totalnum
                    var resb = totalb / totalnum

                    for( var dx = 0 ; dx < size ; dx ++ )
                        for( var dy = 0 ; dy < size ; dy ++ ){

                            var x = i + dx
                            var y = j + dy

                            var p = x*canvasb.width + y
                            pixelData[p*4+0] = resr
                            pixelData[p*4+1] = resg
                            pixelData[p*4+2] = resb
                        }
            }

            contextb.putImageData( imageData , 0 , 0 , 0 , 0 , canvasb.width, canvasb.height )

        }
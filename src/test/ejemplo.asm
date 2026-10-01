.model 
    flat stdcall
.data 
    var1 dw 10000b
    var2 byte 10h, 20o, 30h, 40o
    var3 byte 0ah, 20h, 22h
    varfinal dw ?

.code 
main proc
    mov eax, var1
    mov ax, var1
    mov al, 1Ah
    add ah, 1010011b
main endp

.data segment
    ;add your data here!
    var1 dw 10000
    var2 dw 10000
    var3 dw 10000
    var4  10000 dw ;instruccion incorrecta
    varFinal dw ?  
    lista BYTE 10,20,30,40
    lista byte 0ah,20h,22h
  
ends

.stack segment
    dw   128  dup(0)
ends

.code segment
start:
; set segment registers:
  mov ax,val1
  add ax,val2
  sub ax,val3
  mov valFinal,ax    	
ends


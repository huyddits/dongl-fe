import Image from 'next/image'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="bg-blue-900 px-8 py-12 text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Left Column - Company Info */}
          <div className="col-span-4 space-y-4 md:col-span-4 lg:col-span-2">
            <h2 className="text-2xl font-bold">
              <Image
                src="/image/logo-big.png"
                alt="logo"
                className="h-10 invert"
                width={130}
                height={40}
              />
            </h2>
            <p className="text-large mb-6 font-medium">
              의미 있는 편지를 통해 마음을 이어주세요.
              <br />
              가장 필요한 사람들에게 사랑과 응원을 전합니다.
            </p>

            <div className="space-y-2.5 text-sm text-white/60">
              <p>부산광역시 사하구 하신중앙로 27번길 6</p>
              <p>사업자등록번호: 401-17-62774</p>
              <p>통신판매업번호: 2024-부산사하-0698</p>
              <p>대표자: 황승민</p>
              <p>Email: support@dongl.vn</p>
              <p>Phone: +84 (0) 123 456 789</p>
            </div>
          </div>

          {/* Middle Column - Services */}
          <div className="col-span-4 space-y-4 md:col-span-2 lg:col-span-1">
            <h3 className="text-h3 mb-3 font-semibold">서비스</h3>
            <div className="text-large space-y-3">
              <Link href="#" className="link-underline block text-white/60">
                온라인 편지쓰기
              </Link>
              <Link href="#" className="link-underline block text-white/60">
                편지지 템플릿
              </Link>
              <Link href="#" className="link-underline block text-white/60">
                교도소 편지
              </Link>
              <Link href="#" className="link-underline block text-white/60">
                군인 편지
              </Link>
            </div>
          </div>

          {/* Right Column - Company */}
          <div className="col-span-4 space-y-4 md:col-span-2 lg:col-span-1">
            <h3 className="text-h3 mb-3 font-semibold">회사</h3>
            <div className="text-large space-y-3">
              <Link href="#" className="link-underline block text-white/60">
                회사 소개
              </Link>
              <Link href="#" className="link-underline block text-white/60">
                연락처
              </Link>
              <Link href="#" className="link-underline block text-white/60">
                개인정보 처리방침
              </Link>
              <Link href="#" className="link-underline block text-white/60">
                이용약관
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-white/30 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-medium font-medium text-white/60">
              © 2025 동글 DongL. 모든 권리 보유.
            </p>
            <p className="text-medium font-medium text-white/60">
              소중한 연결을 위한 정성 어린 제작
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
